import { prisma } from "@repo/db";
import { JOB_STATUS, REPOSITORY_STATUS } from "@repo/shared";
import { trackProgress } from "@repo/shared/server";

export async function finalizeReadme(
  repositoryId: string,
  jobId: string,
  readmeContent: string
) {
  console.log(
    `⚙️ [Readme DB] Saving README and updating repo ${repositoryId} status to COMPLETED...`
  );

  await prisma.repository.update({
    where: { id: repositoryId },
    data: {
      readme: readmeContent,
      status: REPOSITORY_STATUS.COMPLETED,
    },
  });

  console.log(`⚙️ [Readme DB] Updating job ${jobId} status to COMPLETED...`);

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
    message: "All done! Your README is ready.",
  });

  console.log(`✅ [Readme DB] Repository README successfully finalized.`);
}
