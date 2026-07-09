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

function buildVirtualTree(files: FileNode[]): TreeNode {
  const virtualTree: TreeNode = {
    name: "root",
    path: "",
    type: "dir",
    tokens: 0,
    children: new Map<string, TreeNode>(),
  };

  for (const file of files) {
    const dirs = file.path.split("/");
    let root = virtualTree;

    for (let i = 0; i < dirs.length; i++) {
      const part = dirs[i];
      const isFile = i === dirs.length - 1;

      if (!root.children.has(part)) {
        root.children.set(part, {
          name: part,
          path: dirs.slice(0, i + 1).join("/"),
          type: isFile ? "file" : "dir",
          tokens: isFile ? file.tokens : 0,
          summary: isFile ? file.summary : undefined,
          children: new Map<string, TreeNode>(),
        });
      }

      root = root.children.get(part)!;
    }
  }

  return virtualTree;
}
