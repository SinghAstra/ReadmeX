import { logError, QUEUE_NAMES, ReadmeGenerationJobData } from "@repo/shared";
import { redisConnection } from "@repo/shared/server";
import { Worker, type Job } from "bullmq";
import { readmeService } from "../services/readme.service";

export const readmeGenerationWorker = new Worker<ReadmeGenerationJobData>(
  QUEUE_NAMES.REPOSITORY_INGESTION,
  async (job: Job<ReadmeGenerationJobData>) => {
    const { jobId, repositoryId } = job.data;

    const buckets = await readmeService.prepareBuckets(repositoryId);

    console.log(`Starting MAP phase for ${buckets.length} buckets...`);
    for (const bucket of buckets) {
      // TODO: Send bucket to AI
    }

    console.log(`Starting REDUCE phase...`);
    // TODO: Synthesize final README
  },
  {
    connection: redisConnection,
    concurrency: 4,
  }
);

readmeGenerationWorker.on("failed", (job, error) => {
  logError(error);
});
