import { prisma } from "@repo/db";
import { FILE_SUMMARY_STATUS, JOB_NAMES } from "@repo/shared";
import { fileSummarizationQueue } from "@repo/shared/server";

export async function queueFilesForSummarization(
  repoId: string,
  jobId: string,
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
    await fileSummarizationQueue.addBulk(
      targetsToQueue.map((file, idx) => ({
        name: JOB_NAMES.SUMMARIZE_FILE,
        data: { fileId: file.id, repositoryId: repoId, jobId, runId: idx + 1 },
      })),
    );
  }

  return targetsToQueue.length;
}
