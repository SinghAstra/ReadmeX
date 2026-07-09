import { prisma } from "@repo/db";
import { FILE_SUMMARY_STATUS, JOB_NAMES } from "@repo/shared";
import { readmeGenerationQueue } from "@repo/shared/server";
import { MODEL_CONFIG } from "../ai/model-config";
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
      },
    });

    const mappedFiles: FileNode[] = dbFiles.map((file) => {
      return {
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
};
