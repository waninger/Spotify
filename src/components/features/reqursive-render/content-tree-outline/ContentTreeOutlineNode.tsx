import type { ContentNode } from "@/components/features/reqursive-render/types";
import styles from "./ContentTreeOutline.module.scss";

type ContentTreeOutlineNodeProps = {
  node: ContentNode;
  depth?: number;
  selectedNodeId?: string;
  onSelectNode: (id: string) => void;
  onRemoveNode: (nodeId: string) => void;
};

export default function ContentTreeOutlineNode({
  node,
  depth = 0,
  selectedNodeId,
  onSelectNode,
  onRemoveNode,
}: ContentTreeOutlineNodeProps) {
  const isSelected = node.id === selectedNodeId;

  return (
    <div className={styles.nodeRow} style={{ paddingLeft: `calc(${depth} * var(--space-4))` }}>
      <div
        className={`${styles.nodeItem}${isSelected ? ` ${styles.nodeItemSelected}` : ""}`}
        onClick={() => onSelectNode(node.id)}
      >
        <span className={styles.nodeType}>{node.type}</span>
        <span className={styles.nodeId}>{node.id}</span>
        {node.type !== "ROOT" && (
          <button
            className={styles.removeButton}
            onClick={(e) => {
              e.stopPropagation();
              onRemoveNode(node.id);
            }}
            aria-label={`Remove ${node.id}`}
          >
            x
          </button>
        )}
      </div>

      {node.children.map((childNode) => (
        <ContentTreeOutlineNode
          key={childNode.id}
          node={childNode}
          depth={depth + 1}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          onRemoveNode={onRemoveNode}
        />
      ))}
    </div>
  );
}