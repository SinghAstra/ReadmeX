import { prisma } from "@repo/db";
import { FILE_SUMMARY_STATUS, JOB_STATUS } from "@repo/shared";
import { trackProgress } from "@repo/shared/server";
import { readmeService } from "../readme.service";

export async function updateGlobalProgress(
  repositoryId: string,
  jobId: string
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
  }
}
