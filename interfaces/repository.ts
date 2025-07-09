import { Repository } from "@prisma/client";

export interface RepositoryWithDocs extends Repository {
  envContent: string;
}

export interface RepositoryPreview {
  owner: string;
  avatarUrl: string;
  name: string;
}
