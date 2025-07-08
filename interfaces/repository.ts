import { Repository } from "@prisma/client";
import { JSXElementConstructor, ReactElement } from "react";

export interface RepositoryWithDocs extends Repository {
  envContent: string;
}

export interface RepositoryPreview {
  owner: string;
  avatarUrl: string;
  name: string;
}
