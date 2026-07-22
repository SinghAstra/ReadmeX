import { prisma } from "@repo/db";
import { JOB_STATUS, logError, REPOSITORY_STATUS } from "@repo/shared";
import { trackProgress } from "@repo/shared/server";
import { getWorkspacePath } from "../../utils/workspace";
import { readmeService } from "../readme.service";
import { cloneRepository } from "./clone-repository";
import { TraversalStats, traverseDirectory } from "./traverse-directory";
import { syncWorkspaceToDatabase } from "./sync-database";
import { queueFilesForSummarization } from "./queue-summarization";

export const ingestionService = {
  async processRepositoryIngestion(jobId: string, isResync = false) {
    const job = await prisma.job.findUnique({ where: { id: jobId } });

    if (!job) return;

    const repo = await prisma.repository.findUnique({
      where: { id: job.repositoryId },
    });

    if (!repo) return;

    const workspacePath = getWorkspacePath(repo.id);

    try {
      await prisma.job.update({
        where: { id: jobId },
        data: { status: JOB_STATUS.RUNNING, startedAt: new Date() },
      });

      await trackProgress({
        jobId,
        repositoryId: repo.id,
        status: JOB_STATUS.RUNNING,
        message: "Synchronizing workspace...",
      });

      await cloneRepository(workspacePath, repo.githubUrl, isResync);

      await trackProgress({
        jobId,
        repositoryId: repo.id,
        status: JOB_STATUS.RUNNING,
        message: "Scanning files...",
      });

      const stats: TraversalStats = {
        totalFiles: 0,
        supportedFiles: 0,
        ignoredFiles: 0,
        totalFolders: 0,
        totalSize: BigInt(0),
        collectedFiles: [],
      };

      await traverseDirectory(workspacePath, workspacePath, stats);

      const { addedCount, modifiedCount, deletedCount } =
        await syncWorkspaceToDatabase(repo.id, stats);

      await trackProgress({
        jobId,
        repositoryId: repo.id,
        status: JOB_STATUS.RUNNING,
        message: `Updating index (${addedCount} added, ${modifiedCount} modified, ${deletedCount} deleted)...`,
      });

      const queuedCount = await queueFilesForSummarization(repo.id, jobId);

      if (queuedCount > 0) {
        await trackProgress({
          jobId,
          repositoryId: repo.id,
          status: JOB_STATUS.RUNNING,
          message: `Initializing AI analysis for ${queuedCount} files...`,
        });
      } else if (deletedCount > 0) {
        await trackProgress({
          jobId,
          repositoryId: repo.id,
          status: JOB_STATUS.RUNNING,
          message: "Files removed. Regenerating README...",
        });

        await readmeService.triggerReadmeGeneration(repo.id, jobId);

        return 4;
      } else {
        await prisma.repository.update({
          where: { id: repo.id },
          data: { status: REPOSITORY_STATUS.COMPLETED },
        });

        await trackProgress({
          jobId,
          repositoryId: repo.id,
          status: JOB_STATUS.COMPLETED,
          message: "Workspace is up to date.",
        });

        await prisma.job.update({
          where: { id: jobId },
          data: { status: JOB_STATUS.COMPLETED, completedAt: new Date() },
        });
      }
    } catch (error) {
      await prisma.job.update({
        where: { id: jobId },
        data: { status: JOB_STATUS.FAILED },
      });

      await prisma.repository.update({
        where: { id: repo.id },
        data: { status: REPOSITORY_STATUS.FAILED },
      });

      await trackProgress({
        jobId,
        repositoryId: repo.id,
        status: JOB_STATUS.FAILED,
        message: "Process failed. Please try again.",
      });

      logError(error);
      throw error;
    }
  },
};
