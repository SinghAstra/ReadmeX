-- AlterTable
ALTER TABLE "Repository" ALTER COLUMN "contributing" DROP NOT NULL,
ALTER COLUMN "env" SET DEFAULT ARRAY[]::TEXT[];
