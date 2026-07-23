import { prisma } from "@repo/db";
import { FILE_SUMMARY_STATUS, JOB_NAMES } from "@repo/shared";
import { fileSummarizationQueue } from "@repo/shared/server";

export async function queueFilesForSummarization(
  repoId: string,
  jobId: string
) {
  const targetsToQueue = await prisma.repositoryFile.findMany({
    where: {
      repositoryId: repoId,
      summaryStatus: {
        not: FILE_SUMMARY_STATUS.COMPLETED,
      },
    },
    select: { id: true },
  });

  if (targetsToQueue.length > 0) {
    const BATCH_SIZE = 50;

    console.log(
      `⚙️ [Queue] Found ${targetsToQueue.length} files. Queueing in batches of ${BATCH_SIZE}...`
    );

    for (let i = 0; i < targetsToQueue.length; i += BATCH_SIZE) {
      const chunk = targetsToQueue.slice(i, i + BATCH_SIZE);

      await fileSummarizationQueue.addBulk(
        chunk.map((file, idx) => ({
          name: JOB_NAMES.SUMMARIZE_FILE,
          data: {
            fileId: file.id,
            repositoryId: repoId,
            jobId,
            runId: i + idx + 1,
          },
        }))
      );

      console.log(
        `✅ [Queue] Added batch ${Math.floor(i / BATCH_SIZE) + 1} (${chunk.length} jobs) to Redis.`
      );
    }
  }

  return targetsToQueue.length;
}
