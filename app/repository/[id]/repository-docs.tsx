import Navbar from "@/components/repo-details/navbar";
import { RepositoryWithDocs } from "@/interfaces/repository";
import { User } from "next-auth";
import React from "react";

interface RepositoryDocsProps {
  repository: RepositoryWithDocs;
  user: User;
}

const RepositoryDocs = ({ repository, user }: RepositoryDocsProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar repository={repository} user={user} />
      <div className="max-w-2xl w-full border rounded my-4 py-2">
        {repository.parsedEnv}
        {repository.contributing}
        {repository.readme}
      </div>
    </div>
  );
};

export default RepositoryDocs;
