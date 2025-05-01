import { Repository } from "@prisma/client";
import { JSXElementConstructor, ReactElement } from "react";

export interface RepositoryWithDocs extends Repository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parsedReadme: ReactElement<any, string | JSXElementConstructor<any>> | null;
  parsedContributing: ReactElement<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    string | JSXElementConstructor<any>
  > | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parsedEnv: ReactElement<any, string | JSXElementConstructor<any>> | null;
}
