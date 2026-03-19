export type NodeType = "HEADING" | "PARAGRAPH" | "LIST" | "LIST_ITEM";

export type ContentNode = {
  type: NodeType;
  id: string;
  children: ContentNode[];
};

export type RenderNodeProps = {
  node: ContentNode;
  children?: React.ReactNode;
};
