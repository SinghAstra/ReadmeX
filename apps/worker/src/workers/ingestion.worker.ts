import { logError, QUEUE_NAMES, RepoIngestionJobData } from "@repo/shared";
import { redisConnection } from "@repo/shared/server";
import { Worker, type Job } from "bullmq";
import { error } from "node:console";
import { ingestionService } from "../services/ingestion.service.js";

export const repositoryIngestionWorker = new Worker<RepoIngestionJobData>(
  QUEUE_NAMES.REPOSITORY_INGESTION,
  async (job: Job<RepoIngestionJobData>) => {
    const { jobId } = job.data;

    console.log("In repo Ingestion Worker");

    await ingestionService.processRepositoryIngestion(jobId);
  },
  {
    connection: redisConnection,
    concurrency: 4,
  }
);

repositoryIngestionWorker.on("failed", (job, error) => {
  logError(error);
});
repositoryIngestionWorker.on("ready", () =>
  console.log("repositoryIngestionWorker ready")
);
repositoryIngestionWorker.on("active", (job) =>
  console.log("repositoryIngestionWorker active", job.id)
);
repositoryIngestionWorker.on("error", (err) => {
  console.log("repositoryIngestionWorker error");
  logError(err);
});
