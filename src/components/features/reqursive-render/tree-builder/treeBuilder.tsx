"use client";
import type { ContentNode } from "@/components/features/reqursive-render/types";
import styles from "./treeBuilder.module.scss";

type TreeBuilderProps = {
  tree?: ContentNode;
  selectedNodeId?: string;
  onSelectNode: (id: string) => void;
  onRemoveNode: (id: string) => void;
};

type TreeNodeProps = {
  node: ContentNode;
  depth?: number;
  selectedNodeId?: string;
  onSelectNode: (id: string) => void;
  onRemoveNode: (id: string) => void;
};

function TreeNode({ node, depth = 0, selectedNodeId, onSelectNode, onRemoveNode }: TreeNodeProps) {
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
            onClick={(e) => { e.stopPropagation(); onRemoveNode(node.id); }}
            aria-label={`Remove ${node.id}`}
          >
            ×
          </button>
        )}
      </div>
      {node.children.map((child) => (
        <TreeNode
          key={child.id}
          node={child}
          depth={depth + 1}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          onRemoveNode={onRemoveNode}
        />
      ))}
    </div>
  );
}

const DEFAULT_TREE: ContentNode = {
  type: "ROOT",
  id: "root",
  parameters: {},
  children: [],
};

export default function TreeBuilder({ tree, selectedNodeId, onSelectNode, onRemoveNode }: TreeBuilderProps) {
  const activeTree = tree ?? DEFAULT_TREE;

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Builder</h2>
        <p className={styles.subtitle}>Compose your content tree</p>
      </header>
      <div className={styles.body}>
        {activeTree.children.length === 0 && activeTree.type === "ROOT" ? (
          <p className={styles.empty}>No nodes yet. Select root and add a node.</p>
        ) : (
          <TreeNode
            node={activeTree}
            selectedNodeId={selectedNodeId}
            onSelectNode={onSelectNode}
            onRemoveNode={onRemoveNode}
          />
        )}
      </div>
    </main>
  );
}
