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
      <div className="max-w-2xl w-full border rounded my-4 p-2 mt-20 mx-auto">
        {repository.parsedEnv}
        {repository.parsedContributing}
        {repository.parsedReadme}
      </div>
    </div>
  );
};

export default RepositoryDocs;
