import { prisma } from "@repo/db";
import { FILE_SUMMARY_STATUS } from "@repo/shared";
import { MODEL_CONFIG } from "../../ai/model-config";
import { chunkTreeIntoBuckets, FileNode } from "../../utils/tree-chunker";

export async function prepareBuckets(repositoryId: string) {
  console.log(
    `⚙️ [Buckets DB] Fetching COMPLETED file summaries for ${repositoryId}...`
  );

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

  console.log(
    `🧮 [Buckets] Chunking ${mappedFiles.length} files into token-optimized buckets...`
  );

  return chunkTreeIntoBuckets(mappedFiles, {
    minTokens: MODEL_CONFIG.minInputTokens,
    maxTokens: MODEL_CONFIG.maxInputTokens,
  });
}
