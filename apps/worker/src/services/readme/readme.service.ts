import { JOB_NAMES } from "@repo/shared";
import { readmeGenerationQueue } from "@repo/shared/server";

export const readmeService = {
  async triggerReadmeGeneration(repositoryId: string, jobId: string) {
    console.log(
      `🚂 [Readme Service] Queuing readme generation job for repo ${repositoryId}`
    );

    await readmeGenerationQueue.add(
      JOB_NAMES.GENERATE_README,
      {
        repositoryId,
        jobId,
      },
      {
        jobId: `readme-${jobId}`,
      }
    );
  },
};
