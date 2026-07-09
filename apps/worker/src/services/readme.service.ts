import { prisma } from "@repo/db";
import { FILE_SUMMARY_STATUS } from "@repo/shared";
import { MODEL_CONFIG } from "../ai/model-config.js";
import { chunkTreeIntoBuckets, FileNode } from "../utils/tree-chunker.js";

export async function prepareBuckets(repositoryId: string) {
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
}
