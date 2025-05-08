import Navbar from "@/components/repo-details/navbar";
import { RepositoryWithDocs } from "@/interfaces/repository";
import { User } from "next-auth";
import React from "react";
import Document from "./document";

interface RepositoryDocsProps {
  repository: RepositoryWithDocs;
  user: User;
}

const RepositoryDocs = ({ repository, user }: RepositoryDocsProps) => {
  return (
    <div className="min-h-screen ">
      <Navbar repository={repository} user={user} />
      <div className="max-w-2xl w-full flex flex-col gap-8  my-4 p-2 mt-20 mx-auto">
        {repository.env.length > 0 && (
          <Document
            documentName=".env.example"
            parsedDocument={repository.parsedEnv}
            content={repository.envContent}
          />
        )}
        {repository.contributing && (
          <Document
            documentName="Contributing.md"
            parsedDocument={repository.parsedContributing}
            content={repository.contributing}
          />
        )}
        {repository.readme && (
          <Document
            documentName="Readme.md"
            parsedDocument={repository.parsedReadme}
            content={repository.readme}
          />
        )}
      </div>
    </div>
  );
};

export default RepositoryDocs;
