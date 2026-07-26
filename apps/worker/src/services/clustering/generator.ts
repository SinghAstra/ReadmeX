import { MODEL_CONFIG } from "../../ai/model-config";
import { executeAIRequest } from "../../ai/request-manager";
import { SYSTEM_PROMPT } from "../../prompt";

export async function generateBucketSummary(
  runId: number,
  bucketPath: string,
  fileData: string
): Promise<string> {
  const userPayload = `Directory: ${bucketPath}\n\nFiles:\n${fileData}`;

  const aiResponse = await executeAIRequest(runId, {
    model: MODEL_CONFIG.activeModel,
    messages: [
      { role: "system", content: SYSTEM_PROMPT.MODULE_SUMMARY },
      {
        role: "user",
        content: userPayload,
      },
    ],
  });

  return (
    aiResponse?.choices[0]?.message?.content?.trim() ||
    "No Module summary written."
  );
}
