import { logError, QUEUE_NAMES } from "@repo/shared";
import { redisConnection } from "@repo/shared/server";
import { Worker, type Job } from "bullmq";
import { readmeOrchestrator } from "../services/readme/orchestrator";

export const readmeGenerationWorker = new Worker(
  QUEUE_NAMES.README_GENERATION,
  async (job: Job) => {
    const { repositoryId, jobId } = job.data;

    console.log(`[Worker] Starting Readme Generation Job...`);

    await readmeOrchestrator.processReadmeGeneration(repositoryId, jobId);
  },
  {
    connection: redisConnection,
    concurrency: 5,
  }
);

readmeGenerationWorker.on("failed", (job, error) => {
  logError(error);
});

readmeGenerationWorker.on("ready", () =>
  console.log("readmeGenerationWorker ready")
);

readmeGenerationWorker.on("active", (job) =>
  console.log("readmeGenerationWorker active", job.id)
);

readmeGenerationWorker.on("error", (err) => {
  console.log("readmeGenerationWorker error");

  logError(err);
});
