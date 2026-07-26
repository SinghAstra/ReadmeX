import { JOB_NAMES } from "@repo/shared";
import { moduleGenerationQueue } from "@repo/shared/server";

export const moduleService = {
  async triggerModuleGeneration(repositoryId: string, jobId: string) {
    console.log(
      `🚂 [Module Service] Queuing clustering job for repo ${repositoryId}`
    );

    await moduleGenerationQueue.add(
      JOB_NAMES.GENERATE_MODULES,
      {
        repositoryId,
        jobId,
      },
      {
        jobId: `clustering-${jobId}`,
      }
    );
  },
};
