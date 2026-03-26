import type { ContentNode } from "@/components/features/reqursive-render/types";
import ContentTreeOutlineNode from "./ContentTreeOutlineNode";
import styles from "./ContentTreeOutline.module.scss";

type ContentTreeOutlineProps = {
  tree: ContentNode;
  selectedNodeId?: string;
  onSelectNode: (id: string) => void;
  onRemoveNode: (nodeId: string) => void;
};

export default function ContentTreeOutline({
  tree,
  selectedNodeId,
  onSelectNode,
  onRemoveNode,
}: ContentTreeOutlineProps) {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Builder</h2>
        <p className={styles.subtitle}>View + mutate the active tree</p>
      </header>
      <div className={styles.body}>
        <ContentTreeOutlineNode
          node={tree}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          onRemoveNode={onRemoveNode}
        />
        {tree.children.length === 0 ? (
          <p className={styles.empty}>No nodes yet. Select ROOT and add from Components.</p>
        ) : null}
      </div>
    </main>
  );
}
