import { ContentNode, NodeType } from "./types";

const VALID_NODE_TYPES: NodeType[] = [
  "HEADING",
  "PARAGRAPH",
  "LIST",
  "LIST_ITEM",
];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNodeType(value: unknown): value is NodeType {
  return typeof value === "string" && VALID_NODE_TYPES.includes(value as NodeType);
}

/**
 * Converts unknown JSON data to a strongly-typed ContentNode tree.
 * Returns null for nodes with unrecognized types (discarding their entire subtree).
 * Throws only when structural fields (id, children) are missing or malformed.
 */
export function translateContentTree(raw: unknown): ContentNode | null {
  if (!isObject(raw)) {
    throw new Error("Invalid content node: expected object.");
  }

  const { type, id, children } = raw;

  // Unknown type — silently discard this node and its entire subtree.
  if (!isNodeType(type)) {
    return null;
  }

  if (typeof id !== "string" || id.length === 0) {
    throw new Error("Invalid content node id: expected non-empty string.");
  }

  if (!Array.isArray(children)) {
    throw new Error(`Invalid content node children for '${id}': expected array.`);
  }

  const translatedChildren = children
    .map((child) => translateContentTree(child))
    .filter((child): child is ContentNode => child !== null);

  return {
    type,
    id,
    children: translatedChildren,
  };
}
