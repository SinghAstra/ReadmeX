import { prisma } from "@repo/db";
import { FILE_SUMMARY_STATUS, JOB_STATUS } from "@repo/shared";
import { trackProgress } from "@repo/shared/server";
import { readmeService } from "../readme.service";
import { withSlowLog } from "../../utils/performance";

export async function updateGlobalProgress(
  repositoryId: string,
  jobId: string
) {
  const totalCount = await withSlowLog(
    `DB Read: Count total files for repo ${repositoryId}`,
    10000,
    prisma.repositoryFile.count({
      where: { repositoryId },
    })
  );

  const completedCount = await withSlowLog(
    `DB Read: Count completed files for repo ${repositoryId}`,
    10000,
    prisma.repositoryFile.count({
      where: { repositoryId, summaryStatus: FILE_SUMMARY_STATUS.COMPLETED },
    })
  );

  await withSlowLog(
    `Redis: Track Progress (${completedCount}/${totalCount})`,
    5000,
    trackProgress({
      jobId,
      repositoryId,
      status: JOB_STATUS.RUNNING,
      message: `Analyzing files... (${completedCount}/${totalCount})`,
    })
  );

  if (completedCount === totalCount) {
    await withSlowLog(
      `Redis: Track Progress (Complete)`,
      5000,
      trackProgress({
        jobId,
        repositoryId,
        status: JOB_STATUS.RUNNING,
        message: "Summarization complete! Grouping Project Files...",
      })
    );

    await withSlowLog(
      `Worker Queue: Trigger README Generation for ${repositoryId}`,
      10000,
      readmeService.triggerReadmeGeneration(repositoryId, jobId)
    );
  }
}
