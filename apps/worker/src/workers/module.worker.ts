import { logError, QUEUE_NAMES } from "@repo/shared";
import { redisConnection } from "@repo/shared/server";
import { Worker, type Job } from "bullmq";
import { clusterer } from "../services/clustering/clusterer";

export const moduleGenerationWorker = new Worker(
  QUEUE_NAMES.MODULE_GENERATION,
  async (job: Job) => {
    const { repositoryId, jobId } = job.data;

    console.log(`[Worker] Starting Module Generation Job...`);

    await clusterer.processModuleGeneration(repositoryId, jobId);
  },
  {
    connection: redisConnection,
    concurrency: 5,
  }
);

moduleGenerationWorker.on("failed", (job, error) => {
  logError(error);
});

moduleGenerationWorker.on("ready", () =>
  console.log("moduleGenerationWorker ready")
);

moduleGenerationWorker.on("active", (job) =>
  console.log("moduleGenerationWorker active", job.id)
);

moduleGenerationWorker.on("error", (err) => {
  console.log("moduleGenerationWorker error");

  logError(err);
});
