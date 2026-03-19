import { NODE_RENDERERS } from "./render-components/renderers";
import { ContentNode } from "./types";

type ReqursiveProps = {
  node: ContentNode;
};

export default function Reqursive({ node }: ReqursiveProps) {
  const Renderer = NODE_RENDERERS[node.type];
  if (!Renderer) {
    // If no renderer is registered for this type, skip this node and its subtree.
    return null;
  }

  const renderedChildren = node.children.map((child) => (
    <Reqursive key={child.id} node={child} />
  ));

  return <Renderer node={node}>{renderedChildren}</Renderer>;
}