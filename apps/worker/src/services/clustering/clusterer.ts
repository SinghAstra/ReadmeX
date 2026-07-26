import { prisma } from "@repo/db";
import { JOB_STATUS, logError } from "@repo/shared";
import { trackProgress } from "@repo/shared/server";

import { prepareBuckets } from "./buckets";
import { generateBucketSummary } from "./generator";
import { finalizeClustering } from "./progress";

export const clusterer = {
  async processModuleGeneration(repositoryId: string, jobId: string) {
    console.log(
      `\n🚀 [Clusterer] Starting Module Generation for Job: ${jobId}`
    );

    // ✨ KILL-SWITCH: Verify job status before spending AI tokens
    console.log(`⚙️ [Clusterer DB] Verifying parent job ${jobId} status...`);

    const activeJob = await prisma.job.findUnique({
      where: { id: jobId },
      select: { status: true },
    });

    if (!activeJob || activeJob.status === JOB_STATUS.CANCELLED) {
      console.log(
        `🛑 [Clusterer] Job ${jobId} was CANCELLED. Bailing out instantly.`
      );

      return;
    }

    try {
      console.log(
        `⚙️ [Clusterer DB] Deleting outdated module summaries for repo ${repositoryId}...`
      );

      await prisma.moduleSummary.deleteMany({
        where: { repositoryId: repositoryId },
      });

      const buckets = await prepareBuckets(repositoryId);

      let runId = 0;

      await trackProgress({
        jobId,
        repositoryId,
        status: JOB_STATUS.RUNNING,
        message: "Grouping project files...",
      });

      for (const bucket of buckets) {
        const fileData = bucket.files
          .map((f) => `File: ${f.path}\nSummary: ${f.summary}`)
          .join("\n\n");

        console.log(
          `🤖 [Clusterer] [Run ${runId}] Requesting AI summary for bucket: ${bucket.path}`
        );

        const moduleSummary = await generateBucketSummary(
          runId,
          bucket.path,
          fileData
        );

        console.log(
          `⚙️ [Clusterer DB] [Run ${runId}] Upserting summary for ${bucket.path}...`
        );

        const existingSummary = await prisma.moduleSummary.findFirst({
          where: {
            repositoryId: repositoryId,
            path: bucket.path,
          },
        });

        if (existingSummary) {
          await prisma.moduleSummary.update({
            where: { id: existingSummary.id },
            data: {
              summary: `${existingSummary.summary}\n\n---\n\n${moduleSummary}`,
              files: {
                connect: bucket.files.map((f) => ({ id: f.id })),
              },
            },
          });
        } else {
          await prisma.moduleSummary.create({
            data: {
              summary: moduleSummary,
              path: bucket.path,
              repositoryId,
              files: {
                connect: bucket.files.map((f) => ({ id: f.id })),
              },
            },
          });
        }

        runId++;

        await trackProgress({
          jobId,
          repositoryId,
          status: JOB_STATUS.RUNNING,
          message: `Analyzing folder: ${bucket.path} (${runId}/${buckets.length})`,
        });
      }

      await finalizeClustering(repositoryId, jobId);
    } catch (error) {
      console.error(`💥 [Clusterer] Failed module generation:`, error);

      logError(error);

      console.log(`⚙️ [Clusterer DB] Updating job ${jobId} to FAILED...`);

      await prisma.job.update({
        where: { id: jobId },
        data: { status: JOB_STATUS.FAILED },
      });

      await trackProgress({
        jobId,
        repositoryId,
        status: JOB_STATUS.FAILED,
        message: "Process failed. Please try again.",
      });

      throw error;
    }
  },
};
