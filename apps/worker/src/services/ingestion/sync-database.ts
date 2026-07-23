import { prisma } from "@repo/db";
import { FILE_SUMMARY_STATUS, REPOSITORY_STATUS } from "@repo/shared";
import { TraversalStats } from "./types";

export async function syncDatabaseWithFiles(
  repoId: string,
  stats: TraversalStats
) {
  console.log(`\n🔄 Starting synchronization for repo: ${repoId}`);

  const existingDBFiles = await prisma.repositoryFile.findMany({
    where: { repositoryId: repoId },
  });

  console.log(
    `📊 Found ${existingDBFiles.length} existing files in the database.`
  );

  const dbFileMap = new Map(
    existingDBFiles.map((f) => [f.relativePath.replace(/\\/g, "/"), f])
  );

  const scannedFiles = stats.collectedFiles.map((f) => ({
    ...f,
    normalizedPath: f.relativePath.replace(/\\/g, "/"),
  }));

  console.log(
    `📂 Scanned ${scannedFiles.length} valid files from the filesystem.`
  );

  const fsPaths = new Set(scannedFiles.map((f) => f.normalizedPath));

  const addedFiles = scannedFiles.filter(
    (f) => !dbFileMap.has(f.normalizedPath)
  );

  const modifiedFiles = scannedFiles.filter((f) => {
    const match = dbFileMap.get(f.normalizedPath);

    return match && match.hash !== f.hash;
  });

  const deletedFiles = existingDBFiles.filter(
    (f) => !fsPaths.has(f.relativePath.replace(/\\/g, "/"))
  );

  console.log(`🧮 Diff Calculation Results:`);

  console.log(`   - ➕ Added:    ${addedFiles.length}`);

  console.log(`   - 📝 Modified: ${modifiedFiles.length}`);

  console.log(`   - ❌ Deleted:  ${deletedFiles.length}`);

  console.log(`⚙️ Executing database operations sequentially...`);

  const repoUpdateResult = await prisma.repository.update({
    where: { id: repoId },
    data: {
      status: REPOSITORY_STATUS.PROCESSING,
      totalFiles: stats.totalFiles,
      supportedFiles: stats.supportedFiles,
      ignoredFiles: stats.ignoredFiles,
      totalFolders: stats.totalFolders,
      totalSize: stats.totalSize,
    },
  });

  console.log(`✅ Repository stats updated for ID: ${repoUpdateResult.id}`);

  if (deletedFiles.length > 0) {
    const deleteResult = await prisma.repositoryFile.deleteMany({
      where: { id: { in: deletedFiles.map((f) => f.id) } },
    });

    console.log(
      `✅ Deleted ${deleteResult.count} outdated files from the database.`
    );
  }

  if (addedFiles.length > 0) {
    const createResult = await prisma.repositoryFile.createMany({
      data: addedFiles.map((file) => ({
        repositoryId: repoId,
        relativePath: file.relativePath,
        extension: file.extension,
        size: file.size,
        hash: file.hash,
        summaryStatus: FILE_SUMMARY_STATUS.PENDING,
      })),
      skipDuplicates: true,
    });

    console.log(
      `✅ Inserted ${createResult.count} new files into the database.`
    );
  }

  if (modifiedFiles.length > 0) {
    console.log(
      `⚙️ Updating ${modifiedFiles.length} modified files one by one...`
    );

    let index = 1;

    for (const file of modifiedFiles) {
      const updateResult = await prisma.repositoryFile.updateMany({
        where: { repositoryId: repoId, relativePath: file.relativePath },
        data: {
          hash: file.hash,
          size: file.size,
          summary: null,
          summaryStatus: FILE_SUMMARY_STATUS.PENDING,
        },
      });

      console.log(
        `✅ [${index}/${modifiedFiles.length}] Updated file: ${file.relativePath} (Rows affected: ${updateResult.count})`
      );

      index++;
    }
  }

  console.log(`✅ Database sync completed successfully.`);

  return {
    addedCount: addedFiles.length,
    modifiedCount: modifiedFiles.length,
    deletedCount: deletedFiles.length,
  };
}
