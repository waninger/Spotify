import { ContentNode, NodeParameterValue, NodeType } from "./types";

const VALID_NODE_TYPES: NodeType[] = [
  "ROOT",
  "HEADING",
  "PARAGRAPH",
  "LIST",
  "LIST_ITEM",
  "IMAGE",
  "CALLOUT",
  "LINK_CARD",
];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNodeType(value: unknown): value is NodeType {
  return typeof value === "string" && VALID_NODE_TYPES.includes(value as NodeType);
}

function isNodeParameterValue(value: unknown): value is NodeParameterValue {
  if (value === null) {
    return true;
  }

  const valueType = typeof value;
  if (valueType === "string" || valueType === "number" || valueType === "boolean") {
    return true;
  }

  if (Array.isArray(value)) {
    return value.every((item) => isNodeParameterValue(item));
  }

  if (isObject(value)) {
    return Object.values(value).every((item) => isNodeParameterValue(item));
  }

  return false;
}

function parseParameters(rawParameters: unknown, nodeId: string): Record<string, NodeParameterValue> {
  if (rawParameters === undefined) {
    return {};
  }

  if (!isObject(rawParameters)) {
    throw new Error(`Invalid content node parameters for '${nodeId}': expected object.`);
  }

  const entries = Object.entries(rawParameters);
  for (const [key, value] of entries) {
    if (!isNodeParameterValue(value)) {
      throw new Error(
        `Invalid content node parameter '${key}' for '${nodeId}': unsupported value type.`,
      );
    }
  }

  return rawParameters as Record<string, NodeParameterValue>;
}

/**
 * Normalizes unknown JSON data into a strongly-typed ContentNode tree.
 * Validates structure, filters unknown node types (silently discards their entire subtrees),
 * and ensures all parameters are properly typed.
 */
export function normalizeContentTree(raw: unknown): ContentNode | null {
  if (!isObject(raw)) {
    throw new Error("Invalid content node: expected object.");
  }

  const { type, id, parameters, children } = raw;

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

  const parsedParameters = parseParameters(parameters, id);

  const normalizedChildren = children
    .map((child) => normalizeContentTree(child))
    .filter((child): child is ContentNode => child !== null);

  return {
    type,
    id,
    parameters: parsedParameters,
    children: normalizedChildren,
  };
}
