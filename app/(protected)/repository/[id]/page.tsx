import { authOptions } from "@/lib/auth-options";
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

  const envContent = repository.env.map((env) => `${env}=\n`).join("");

  const parsedRepository = {
    ...repository,
    envContent,
  };

  return <RepositoryDocs repository={parsedRepository} user={session.user} />;
}
