import { prisma } from "@repo/db";
import { FILE_SUMMARY_STATUS } from "@repo/shared";
import fs from "node:fs/promises";
import path from "node:path";
import { estimateTokenCount, MODEL_CONFIG } from "../../ai/model-config";
import { SYSTEM_PROMPT } from "../../prompt";
import { classifyFile } from "../../utils/file-classifier";
import { getWorkspacePath } from "../../utils/workspace";
import { withSlowLog } from "../../utils/performance";
import { generateChunkedSummary } from "./generate-chunked-summary";
import { generateSummaryDirectly } from "./generate-summary-directly";
import { updateGlobalProgress } from "./update-global-progress";

export const summarizationService = {
  async processFileSummary(
    fileId: string,
    repositoryId: string,
    jobId: string,
    runId: number,
  ) {
    const file = await withSlowLog(
      `DB Read: Find file ${fileId}`,
      10000,
      prisma.repositoryFile.findUnique({
        where: { id: fileId },
      }),
    );

    const repo = await withSlowLog(
      `DB Read: Find repo ${repositoryId}`,
      10000,
      prisma.repository.findUnique({
        where: { id: repositoryId },
      }),
    );

    if (!file || !repo) {
      throw new Error(
        `SUMMARIZATION_ERROR: Missing records for File: ${fileId} or Repo: ${repositoryId}`,
      );
    }

    await withSlowLog(
      `DB Write: Set PROCESSING for ${file.relativePath}`,
      10000,
      prisma.repositoryFile.update({
        where: { id: fileId },
        data: { summaryStatus: FILE_SUMMARY_STATUS.PROCESSING },
      }),
    );

    const workspacePath = getWorkspacePath(repositoryId);

    try {
      const absoluteFilePath = path.join(workspacePath, file.relativePath);

      const fileContent = await withSlowLog(
        `FS Read: Read file ${file.relativePath}`,
        5000,
        fs.readFile(absoluteFilePath, "utf8"),
      );

      const classification = classifyFile(
        file.relativePath,
        path.basename(file.relativePath),
        fileContent,
      );

      let summaryText = "";

      if (!classification.shouldSummarizeWithAI) {
        summaryText = classification.staticSummary;

        console.log(
          `[Run ${runId}] ⚡ FAST-TRACK | Bypassed AI overhead for ${classification.category} resource: ${file.relativePath}`,
        );
      } else {
        const contentTokens = estimateTokenCount(fileContent);

        const promptTokens =
          estimateTokenCount(SYSTEM_PROMPT.FILE_SUMMARY) + 150;

        const totalEstimatedTokens = contentTokens + promptTokens;

        if (totalEstimatedTokens > MODEL_CONFIG.maxInputTokens) {
          summaryText = await withSlowLog(
            `AI Gen (Chunked): ${file.relativePath}`,
            30000,
            generateChunkedSummary(runId, file.relativePath, fileContent),
          );
        } else {
          summaryText = await withSlowLog(
            `AI Gen (Direct): ${file.relativePath}`,
            30000,
            generateSummaryDirectly(runId, file.relativePath, fileContent),
          );
        }
      }

      await withSlowLog(
        `DB Write: Set COMPLETED for ${file.relativePath}`,
        15000,
        prisma.repositoryFile.update({
          where: { id: fileId },
          data: {
            summary: summaryText,
            summaryStatus: FILE_SUMMARY_STATUS.COMPLETED,
          },
        }),
      );

      await withSlowLog(
        `Redis/DB: Update Global Progress for ${repositoryId}`,
        15000,
        updateGlobalProgress(repositoryId, jobId, workspacePath),
      );
    } catch (error: unknown) {
      await withSlowLog(
        `DB Write: Set FAILED for ${file?.relativePath || fileId}`,
        10000,
        prisma.repositoryFile.update({
          where: { id: fileId },
          data: { summaryStatus: FILE_SUMMARY_STATUS.FAILED },
        }),
      );

      throw error;
    }
  },
};
