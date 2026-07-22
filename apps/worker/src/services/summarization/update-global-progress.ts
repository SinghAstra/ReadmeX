import { prisma } from "@repo/db";
import { FILE_SUMMARY_STATUS, JOB_STATUS, logError } from "@repo/shared";
import { trackProgress } from "@repo/shared/server";
import { readmeService } from "../readme.service";
import fs from "node:fs/promises";

export async function updateGlobalProgress(
  repositoryId: string,
  jobId: string,
  diskPath: string,
) {
  const totalCount = await prisma.repositoryFile.count({
    where: { repositoryId },
  });

  const completedCount = await prisma.repositoryFile.count({
    where: { repositoryId, summaryStatus: FILE_SUMMARY_STATUS.COMPLETED },
  });

  await trackProgress({
    jobId,
    repositoryId,
    status: JOB_STATUS.RUNNING,
    message: `Analyzing files... (${completedCount}/${totalCount})`,
  });

  if (completedCount === totalCount) {
    await trackProgress({
      jobId,
      repositoryId,
      status: JOB_STATUS.RUNNING,
      message: "Summarization complete! Grouping Project Files...",
    });

    await readmeService.triggerReadmeGeneration(repositoryId, jobId);

    try {
      await fs.rm(diskPath, { recursive: true, force: true });

      console.log(
        `[CLEANUP] Successfully deleted repository from disk: ${diskPath}`,
      );
    } catch (error) {
      logError(error);

      console.error(
        `[CLEANUP ERROR] Failed to delete directory ${diskPath}:`,
        error,
      );
    }
  }
}
