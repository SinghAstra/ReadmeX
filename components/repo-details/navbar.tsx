import { siteConfig } from "@/config/site";
import { RepositoryWithDocs } from "@/interfaces/repository";
import { User } from "next-auth";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarMenu } from "../ui/avatar-menu";

interface RepoDetailsNavbarProps {
  repository: RepositoryWithDocs;
  user: User;
}

const Navbar = ({ repository, user }: RepoDetailsNavbarProps) => {
  return (
    <header className=" px-4 py-2 flex items-center justify-between fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex gap-2 items-center">
        <Link
          href="/dashboard"
          className=" hover:opacity-80 transition-opacity"
        >
          <span className="tracking-wide text-2xl font-medium">
            {siteConfig.name}
          </span>
        </Link>
        <a
          href={repository?.url}
          target="_blank"
          className="flex gap-2 items-center border p-2  rounded-lg w-fit cursor-pointer hover:bg-secondary transition-colors duration-150 group"
        >
          <Avatar className="w-8 h-8">
            <AvatarImage src={repository.avatarUrl} />
          </Avatar>
          <div className="flex gap-1">
            <span className="text-foreground">{repository.owner}</span>
            <span className="text-muted group-hover:text-muted-foreground ">
              {"/"}
            </span>
            <span className="text-foreground">{repository.name}</span>
          </div>
        </a>
      </div>
      <div className="flex gap-2 items-center">
        <AvatarMenu user={user} />
      </div>
    </header>
  );
};

export default Navbar;
