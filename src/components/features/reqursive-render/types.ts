export type NodeType =
  | "ROOT"
  | "HEADING"
  | "PARAGRAPH"
  | "LIST"
  | "LIST_ITEM"
  | "IMAGE"
  | "CALLOUT"
  | "LINK_CARD";

export type NodeParameterValue =
  | string
  | number
  | boolean
  | null
  | NodeParameterValue[]
  | { [key: string]: NodeParameterValue };

export type ContentNode = {
  type: NodeType;
  id: string;
  parameters: Record<string, NodeParameterValue>;
  children: ContentNode[];
};

export type RenderNodeProps = {
  node: ContentNode;
  children?: React.ReactNode;
};
