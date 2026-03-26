import type { ContentNode } from "@/components/features/reqursive-render/types";

export function createNodeId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createRootNode(): ContentNode {
  return {
    type: "ROOT",
    id: createNodeId(),
    parameters: {},
    children: [],
  };
}

export function cloneNodeWithFreshIds(node: ContentNode): ContentNode {
  return {
    type: node.type,
    id: createNodeId(),
    parameters: { ...node.parameters },
    children: node.children.map((child) => cloneNodeWithFreshIds(child)),
  };
}

/**
 * Creates a new tree with the specified child node appended to the parent node with the given ID. 
 * If the parentId is not found, returns the original tree.
 */
export function appendChildToNode(
  tree: ContentNode,
  parentId: string,
  childNode: ContentNode,
): ContentNode {
  if (tree.id === parentId) {
    return {
      ...tree,
      children: [...tree.children, childNode],
    };
  }

  const nextChildren = tree.children.map((child) =>
    appendChildToNode(child, parentId, childNode),
  );
  const changed = nextChildren.some((child, index) => child !== tree.children[index]);

  if (!changed) {
    return tree;
  }

  return {
    ...tree,
    children: nextChildren,
  };
}

/**
 * Creates a new tree with the specified node removed. If the nodeId is not found, returns the original tree.
 */
export function removeNodeFromTree(tree: ContentNode, nodeId: string): ContentNode {
  if (tree.id === nodeId) {
    return tree;
  }

  const filteredChildren = tree.children.filter((child) => child.id !== nodeId);

  if (filteredChildren.length !== tree.children.length) {
    return {
      ...tree,
      children: filteredChildren,
    };
  }

  const nextChildren = tree.children.map((child) => removeNodeFromTree(child, nodeId));
  const changed = nextChildren.some((child, index) => child !== tree.children[index]);

  if (!changed) {
    return tree;
  }

  return {
    ...tree,
    children: nextChildren,
  };
}

/**
 * Recursively searches the tree for a node with the specified ID. Returns the node if found, or null if not found.
 */
export function findNodeById(tree: ContentNode, nodeId: string): ContentNode | null {
  if (tree.id === nodeId) {
    return tree;
  }

  for (const child of tree.children) {
    const foundNode = findNodeById(child, nodeId);
    if (foundNode) {
      return foundNode;
    }
  }

  return null;
}
