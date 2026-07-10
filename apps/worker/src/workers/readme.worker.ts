import { prisma } from "@repo/db";
import { logError, QUEUE_NAMES, ReadmeGenerationJobData } from "@repo/shared";
import { redisConnection } from "@repo/shared/server";
import { Worker, type Job } from "bullmq";
import { readmeService } from "../services/readme.service";

export const readmeGenerationWorker = new Worker<ReadmeGenerationJobData>(
  QUEUE_NAMES.REPOSITORY_INGESTION,
  async (job: Job<ReadmeGenerationJobData>) => {
    const { jobId, repositoryId } = job.data;
    await readmeService.processReadmeGeneration(repositoryId, jobId);
  },
  {
    connection: redisConnection,
    concurrency: 4,
  }
);

readmeGenerationWorker.on("failed", (job, error) => {
  logError(error);
});
