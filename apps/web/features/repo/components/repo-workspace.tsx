"use client";

import { RepoHeader } from "@/features/repo/components/repo-header";

interface RepositoryWorkspaceProps {
  repo: {
    id: string;
  };
}

export function RepositoryWorkspace({ repo }: RepositoryWorkspaceProps) {
  const handleCopyReadme = async () => {};

  return (
    <div className="flex-1 flex flex-col overflow-hidden h-full w-full">
      <RepoHeader onCopyReadme={handleCopyReadme} />

      <main className="flex-1 overflow-y-auto h-full p-1 md:p-2 lg:p-4 animate-in fade-in duration-300"></main>
    </div>
  );
}
