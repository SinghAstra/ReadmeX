import { prisma } from "@repo/db";
import { FILE_SUMMARY_STATUS, JOB_STATUS } from "@repo/shared";
import { trackProgress } from "@repo/shared/server";
import { moduleService } from "../clustering/module.service";

export async function syncProgress(repositoryId: string, jobId: string) {
  console.log(
    `⚙️ [Summarizer DB] Fetching total file count for repo ${repositoryId}...`
  );

  const totalCount = await prisma.repositoryFile.count({
    where: { repositoryId },
  });

  console.log(
    `⚙️ [Summarizer DB] Fetching completed file count for repo ${repositoryId}...`
  );

  const completedCount = await prisma.repositoryFile.count({
    where: { repositoryId, summaryStatus: FILE_SUMMARY_STATUS.COMPLETED },
  });

  console.log(
    `⚙️ [Summarizer DB] Fetching failed file count for repo ${repositoryId}...`
  );

  const failedCount = await prisma.repositoryFile.count({
    where: { repositoryId, summaryStatus: FILE_SUMMARY_STATUS.FAILED },
  });

  const processedCount = completedCount + failedCount;

  console.log(
    `📊 [Progress] Repo ${repositoryId}: ${processedCount}/${totalCount} processed (${completedCount} passed, ${failedCount} failed)`
  );

  await trackProgress({
    jobId,
    repositoryId,
    status: JOB_STATUS.RUNNING,
    message: `Analyzing files... (${completedCount}/${totalCount})`,
  });

  if (completedCount === totalCount) {
    console.log(
      `✅ [Summarizer DB] All files processed. Triggering Module Clustering...`
    );

    await trackProgress({
      jobId,
      repositoryId,
      status: JOB_STATUS.RUNNING,
      message: "Summarization complete! Grouping Project Files...",
    });

    await moduleService.triggerModuleGeneration(repositoryId, jobId);
  }
}
