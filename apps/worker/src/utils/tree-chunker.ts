export interface FileNode {
  path: string;
  summary: string;
  tokens: number;
}

export interface Bucket {
  path: string;
  tokenCount: number;
  files: FileNode[];
}

export interface TreeNode {
  name: string;
  path: string;
  type: "file" | "dir";
  tokens: number;
  summary?: string;
  children: Map<string, TreeNode>;
}
