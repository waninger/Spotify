import type { NodeParameterValue, NodeType } from "@/components/features/reqursive-render/types";

export type NodeTemplate = {
  type: Exclude<NodeType, "ROOT">;
  label: string;
  description: string;
  defaultParameters: Record<string, NodeParameterValue>;
};

export const NODE_TEMPLATES: NodeTemplate[] = [
  {
    type: "HEADING",
    label: "Heading",
    description: "A section title or document heading.",
    defaultParameters: { text: "New Heading" },
  },
  {
    type: "PARAGRAPH",
    label: "Paragraph",
    description: "A block of body text.",
    defaultParameters: { text: "New paragraph text." },
  },
  {
    type: "LIST",
    label: "List",
    description: "A container for list items.",
    defaultParameters: { title: "" },
  },
  {
    type: "LIST_ITEM",
    label: "List Item",
    description: "A single item inside a list.",
    defaultParameters: { text: "New item" },
  },
  {
    type: "IMAGE",
    label: "Image",
    description: "An image with optional alt text and caption.",
    defaultParameters: { url: "", alt: "", caption: "" },
  },
  {
    type: "CALLOUT",
    label: "Callout",
    description: "A highlighted box for notes or alerts.",
    defaultParameters: { title: "New Callout", text: "" },
  },
  {
    type: "LINK_CARD",
    label: "Link Card",
    description: "A clickable card linking to an external resource.",
    defaultParameters: { title: "New Link", description: "", href: "", label: "Open" },
  },
];
