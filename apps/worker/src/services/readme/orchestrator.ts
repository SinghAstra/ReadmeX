import { prisma } from "@repo/db";
import { JOB_STATUS, logError } from "@repo/shared";
import { trackProgress } from "@repo/shared/server";

import { generateFinalReadme } from "./generator";
import { finalizeReadme } from "./progress";

export const readmeOrchestrator = {
  async processReadmeGeneration(repositoryId: string, jobId: string) {
    console.log(
      `\n🚀 [Readme Orchestrator] Starting README Generation for Job: ${jobId}`
    );

    // ✨ KILL-SWITCH: Verifying parent job status before hitting AI
    console.log(`⚙️ [Readme DB] Verifying parent job ${jobId} status...`);

    const activeJob = await prisma.job.findUnique({
      where: { id: jobId },
      select: { status: true },
    });

    if (!activeJob || activeJob.status === JOB_STATUS.CANCELLED) {
      console.log(
        `🛑 [Readme Orchestrator] Job ${jobId} was CANCELLED. Bailing out instantly.`
      );

      return;
    }

    try {
      console.log(`⚙️ [Readme DB] Fetching repo details...`);

      const repo = await prisma.repository.findUnique({
        where: { id: repositoryId },
        select: { name: true },
      });

      console.log(`⚙️ [Readme DB] Fetching grouped module summaries...`);

      const moduleSummaries = await prisma.moduleSummary.findMany({
        where: { repositoryId },
        orderBy: { path: "asc" },
      });

      const finalPayload = moduleSummaries
        .map((ms) => `### ${ms.path}\n${ms.summary}`)
        .join("\n\n");

      await trackProgress({
        jobId,
        repositoryId,
        status: JOB_STATUS.RUNNING,
        message: "Putting it all together into your final README...",
      });

      console.log(
        `🤖 [Readme Orchestrator] Requesting AI to generate master README...`
      );

      const runId = 999;

      const finalReadmeText = await generateFinalReadme(
        runId,
        repo?.name || "My Project",
        finalPayload
      );

      await finalizeReadme(repositoryId, jobId, finalReadmeText);
    } catch (error) {
      console.error(
        `💥 [Readme Orchestrator] Failed README generation:`,
        error
      );

      logError(error);

      console.log(`⚙️ [Readme DB] Updating job ${jobId} to FAILED...`);

      await prisma.job.update({
        where: { id: jobId },
        data: { status: JOB_STATUS.FAILED },
      });

      await trackProgress({
        jobId,
        repositoryId,
        status: JOB_STATUS.FAILED,
        message: "Oops! Something went wrong while writing the README.",
      });

      throw error;
    }
  },
};
