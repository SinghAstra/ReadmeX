import { Repository } from "@prisma/client";
import { JSXElementConstructor, ReactElement } from "react";

export interface RepositoryWithDocs extends Repository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parsedReadme: ReactElement<any, string | JSXElementConstructor<any>> | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parsedEnv: ReactElement<any, string | JSXElementConstructor<any>> | null;
  envContent: string;
}

export interface RepositoryPreview {
  owner: string;
  avatarUrl: string;
  name: string;
}
