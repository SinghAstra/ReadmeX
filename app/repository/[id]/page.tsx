import { authOptions } from "@/lib/auth-options";
import { parseMdx } from "@/lib/markdown";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { getRepositoryData } from "./action";
import RepositoryDocs from "./repository-docs";

type RepositoryLayoutProps = {
  params: { id: string };
};

export default async function RepositoryPage({
  params,
}: RepositoryLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/sign-in");
  }

  const repository = await getRepositoryData(params.id);
  if (!repository || repository.status === "FAILED") {
    notFound();
  }

  if (repository.status === "PENDING" || repository.status === "PROCESSING") {
    redirect(`/logs/${repository.id}`);
  }

  const readmeContent = repository.readme || "No Readme.md For this File";
  const contributingContent =
    repository.contributing || "No Contributing.md For this File";

  const { content: parsedReadme } = await parseMdx(readmeContent);

  const { content: parsedContributing } = await parseMdx(contributingContent);

  let parsedEnv = null;

  const envContent = repository.env.map((env) => `${env}=\n`).join("");
  const wrappedEnvContent = `\`\`\`\n${envContent}\n\`\`\``;

  const { content } = await parseMdx(wrappedEnvContent);
  parsedEnv = content;

  const parsedRepository = {
    ...repository,
    envContent,
    parsedReadme,
    parsedContributing,
    parsedEnv,
  };

  return <RepositoryDocs repository={parsedRepository} user={session.user} />;
}
