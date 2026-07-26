import { MODEL_CONFIG } from "../../ai/model-config";
import { executeAIRequest } from "../../ai/request-manager";
import { SYSTEM_PROMPT } from "../../prompt";

export async function generateFinalReadme(
  runId: number,
  projectName: string,
  compiledModules: string
): Promise<string> {
  const aiResponse = await executeAIRequest(runId, {
    model: MODEL_CONFIG.activeModel,
    messages: [
      { role: "system", content: SYSTEM_PROMPT.MASTER_README },
      {
        role: "user",
        content: `Project Name: ${projectName}\n\n${compiledModules}`,
      },
    ],
  });

  return (
    aiResponse?.choices[0]?.message?.content?.trim() ||
    "Failed to generate README."
  );
}
