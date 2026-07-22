import { MODEL_CONFIG } from "../../ai/model-config";
import { executeAIRequest } from "../../ai/request-manager";
import { SYSTEM_PROMPT } from "../../prompt";

export async function generateSummaryDirectly(
  runId: number,
  relativePath: string,
  content: string
): Promise<string> {
  const aiResponse = await executeAIRequest(runId, {
    model: MODEL_CONFIG.activeModel,
    messages: [
      { role: "system", content: SYSTEM_PROMPT.FILE_SUMMARY },
      {
        role: "user",
        content: `Explain why this file exists and its primary responsibility:\n\nPath: ${relativePath}\n\nContent:\n${content}`,
      },
    ],
  });
  return (
    aiResponse?.choices[0]?.message?.content?.trim() || "No summary written."
  );
}