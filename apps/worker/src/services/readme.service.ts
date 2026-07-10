import { prisma } from "@repo/db";
import { FILE_SUMMARY_STATUS, JOB_NAMES } from "@repo/shared";
import { readmeGenerationQueue } from "@repo/shared/server";
import { MODEL_CONFIG } from "../ai/model-config";
import { executeAIRequest } from "../ai/request-manager";
import { MODULE_SUMMARY_SYSTEM_PROMPT } from "../prompt";
import { chunkTreeIntoBuckets, FileNode } from "../utils/tree-chunker";

export const readmeService = {
  async prepareBuckets(repositoryId: string) {
    const dbFiles = await prisma.repositoryFile.findMany({
      where: {
        repositoryId,
        summaryStatus: FILE_SUMMARY_STATUS.COMPLETED,
      },
      select: {
        relativePath: true,
        summary: true,
        id: true,
      },
    });

    const mappedFiles: FileNode[] = dbFiles.map((file) => {
      return {
        id: file.id,
        path: file.relativePath,
        summary: file.summary!,
        tokens: Math.ceil(file.summary ? file.summary.length / 4 : 0),
      };
    });

    const buckets = chunkTreeIntoBuckets(mappedFiles, {
      minTokens: MODEL_CONFIG.minInputTokens,
      maxTokens: MODEL_CONFIG.maxInputTokens,
    });

    return buckets;
  },

  async triggerReadmeGeneration(repositoryId: string, jobId: string) {
    await readmeGenerationQueue.add(JOB_NAMES.GENERATE_README, {
      repositoryId,
      jobId,
    });
  },

  async processReadmeGeneration(repositoryId: string, jobId: string) {
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
          files: {
            connect: bucket.files.map((f) => ({ id: f.id })),
          },
        },
      });
      runId++;
    }

    console.log(`Starting REDUCE phase...`);
    // TODO: Synthesize final README
  },
};
