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

export function buildVirtualTree(files: FileNode[]): TreeNode {
  const rootNode: TreeNode = {
    name: "root",
    path: "",
    type: "dir",
    tokens: 0,
    children: new Map<string, TreeNode>(),
  };

  for (const file of files) {
    const pathSegments = file.path.split("/");
    let currentNode = rootNode;

    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      const isFile = i === pathSegments.length - 1;

      if (!currentNode.children.has(segment)) {
        currentNode.children.set(segment, {
          name: segment,
          path: pathSegments.slice(0, i + 1).join("/"),
          type: isFile ? "file" : "dir",
          tokens: isFile ? file.tokens : 0,
          summary: isFile ? file.summary : undefined,
          children: new Map<string, TreeNode>(),
        });
      }

      currentNode = currentNode.children.get(segment)!;
    }
  }

  return rootNode;
}

interface TraverseResult {
  unBucketedFiles: FileNode[];
  unBucketedTokens: number;
}

export function traverse(node: TreeNode): TraverseResult {
  if (node.type === "file") {
    return {
      unBucketedFiles: [
        { path: node.path, summary: node.summary!, tokens: node.tokens },
      ],
      unBucketedTokens: node.tokens,
    };
  }

  const unBucketedFiles: FileNode[] = [];
  let unBucketedTokens = 0;

  for (const childNode of node.children.values()) {
    const result = traverse(childNode);
    unBucketedFiles.push(...result.unBucketedFiles);
    unBucketedTokens += result.unBucketedTokens;
  }

  return { unBucketedFiles, unBucketedTokens };
}
