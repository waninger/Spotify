import type { ComponentType } from "react";
import RenderHeading from "../render-heading/renderHeading";
import RenderList from "../render-list/renderList";
import RenderListItem from "../render-list-item/renderListItem";
import RenderParagraph from "../render-paragraph/renderParagraph";
import { NodeType, RenderNodeProps } from "../types";

type NodeRenderer = ComponentType<RenderNodeProps>;

// Registry: map each supported node type to its renderer component.
export const NODE_RENDERERS: Partial<Record<NodeType, NodeRenderer>> = {
  HEADING: RenderHeading,
  PARAGRAPH: RenderParagraph,
  LIST: RenderList,
  LIST_ITEM: RenderListItem,
};
