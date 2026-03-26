import type { ComponentType } from "react";
import RenderCallout from "../render-callout/renderCallout";
import RenderHeading from "../render-heading/renderHeading";
import RenderImage from "../render-image/renderImage";
import RenderList from "../render-list/renderList";
import RenderListItem from "../render-list-item/renderListItem";
import RenderLinkCard from "../render-link-card/renderLinkCard";
import RenderParagraph from "../render-paragraph/renderParagraph";
import RenderRoot from "../render-root/renderRoot";
import { NodeType, RenderNodeProps } from "../../types";

type NodeRenderer = ComponentType<RenderNodeProps>;

// Registry: map each supported node type to its renderer component.
export const NODE_RENDERERS: Partial<Record<NodeType, NodeRenderer>> = {
  ROOT: RenderRoot,
  IMAGE: RenderImage,
  CALLOUT: RenderCallout,
  LINK_CARD: RenderLinkCard,
};


  // HEADING: RenderHeading,
  // PARAGRAPH: RenderParagraph,
  // LIST: RenderList,
  // LIST_ITEM: RenderListItem,