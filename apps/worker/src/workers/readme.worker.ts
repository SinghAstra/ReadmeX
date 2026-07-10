import { prisma } from "@repo/db";
import { logError, QUEUE_NAMES, ReadmeGenerationJobData } from "@repo/shared";
import { redisConnection } from "@repo/shared/server";
import { Worker, type Job } from "bullmq";
import { MODEL_CONFIG } from "../ai/model-config";
import { executeAIRequest } from "../ai/request-manager";
import { MODULE_SUMMARY_SYSTEM_PROMPT } from "../prompt";
import { readmeService } from "../services/readme.service";

export const readmeGenerationWorker = new Worker<ReadmeGenerationJobData>(
  QUEUE_NAMES.REPOSITORY_INGESTION,
  async (job: Job<ReadmeGenerationJobData>) => {
    const { jobId, repositoryId } = job.data;

    const buckets = await readmeService.prepareBuckets(repositoryId);
    let runId = 0;

    for (const bucket of buckets) {
      const fileData = bucket.files
        .map((f) => `File: ${f.path}\nSummary: ${f.summary}`)
        .join("\n\n");
      const userPayload = `Directory: ${bucket.path}\n\nFiles:\n${fileData}`;

      // We also have to provide runId here can it simply be index increased by 1
      const aiResponse = await executeAIRequest(runId, {
        model: MODEL_CONFIG.activeModel,
        messages: [
          { role: "system", content: MODULE_SUMMARY_SYSTEM_PROMPT },
          {
            role: "user",
            content: userPayload,
          },
        ],
      });

      const moduleSummary =
        aiResponse?.choices[0]?.message?.content?.trim() ||
        "No Module summary written.";

      await prisma.moduleSummary.create({
        data: {
          summary: moduleSummary,
          path: bucket.path,
          repositoryId,
        },
      });
      runId++;
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
