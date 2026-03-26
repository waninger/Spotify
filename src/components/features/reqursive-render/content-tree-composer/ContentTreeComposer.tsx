"use client";

import { useReducer } from "react";
import Reqursive from "@/components/features/reqursive-render/reqursive";
import type { ContentNode } from "@/components/features/reqursive-render/types";
import ContentTreeOutline from "@/components/features/reqursive-render/content-tree-outline/ContentTreeOutline";
import ComposerCatalog from "@/components/features/reqursive-render/composer-catalog/ComposerCatalog";
import {
  createInitialComposerState,
  composerReducer,
} from "@/components/features/reqursive-render/composer-state/composerReducer";
import {
  cloneNodeWithFreshIds,
  findNodeById,
} from "@/components/features/reqursive-render/composer-state/composerUtils";
import styles from "./ContentTreeComposer.module.scss";

type ContentTreeComposerProps = {
  initialTree: ContentNode;
  initialComponents: ContentNode[];
};

export default function ContentTreeComposer({
  initialTree,
  initialComponents,
}: ContentTreeComposerProps) {
  const [state, dispatch] = useReducer(
    composerReducer,
    initialTree,
    createInitialComposerState,
  );

  const selectedNode =
    findNodeById(state.tree, state.selectedNodeId) ?? state.tree;

  function handleInsertComponent(component: ContentNode) {
    dispatch({
      type: "add-child",
      parentId: selectedNode.id,
      node: cloneNodeWithFreshIds(component),
    });
  }

  function handleRemoveNode(nodeId: string) {
    dispatch({ type: "remove-node", nodeId });
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.panel}>
        <header className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Preview</h2>
          <p className={styles.panelSubtitle}>
            Live render of the current tree
          </p>
        </header>
        <div className={styles.panelBody}>
          {state.tree.children.length === 0 ? (
            <p className={styles.empty}>No nodes added yet.</p>
          ) : (
            <Reqursive node={state.tree} />
          )}
        </div>
      </aside>
      
      <ContentTreeOutline
        tree={state.tree}
        selectedNodeId={state.selectedNodeId}
        onSelectNode={(nodeId) => dispatch({ type: "select-node", nodeId })}
        onRemoveNode={handleRemoveNode}
      />

      <ComposerCatalog
        components={initialComponents}
        selectedNodeType={selectedNode.type}
        onInsertComponent={handleInsertComponent}
      />
    </div>
  );
}
