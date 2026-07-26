import { prisma } from "@repo/db";
import { JOB_STATUS, REPOSITORY_STATUS } from "@repo/shared";
import { trackProgress } from "@repo/shared/server";

export async function finalizeClustering(repositoryId: string, jobId: string) {
  console.log(
    `⚙️ [Clustering DB] Updating repository ${repositoryId} status to COMPLETED...`
  );

  await prisma.repository.update({
    where: { id: repositoryId },
    data: {
      status: REPOSITORY_STATUS.COMPLETED,
    },
  });

  console.log(
    `⚙️ [Clustering DB] Updating job ${jobId} status to COMPLETED...`
  );

  await prisma.job.update({
    where: { id: jobId },
    data: {
      status: JOB_STATUS.COMPLETED,
      completedAt: new Date(),
    },
  });

  await trackProgress({
    jobId,
    repositoryId,
    status: JOB_STATUS.COMPLETED,
    message: "Analysis complete! Loading workspace...",
  });

  console.log(
    `✅ [Clustering DB] Repository clustering successfully finalized.`
  );
}
