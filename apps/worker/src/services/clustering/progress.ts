import { JOB_STATUS } from "@repo/shared";
import { trackProgress } from "@repo/shared/server";
import { readmeService } from "../readme/readme.service";

export async function finalizeClustering(repositoryId: string, jobId: string) {
  console.log(
    `✅ [Clustering DB] All modules generated. Triggering Readme Generation...`
  );

  await trackProgress({
    jobId,
    repositoryId,
    status: JOB_STATUS.RUNNING,
    message: "Modules grouped! Drafting README...",
  });

  await readmeService.triggerReadmeGeneration(repositoryId, jobId);
}
