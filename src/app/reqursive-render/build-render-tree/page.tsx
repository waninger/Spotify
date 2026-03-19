"use client";

import { useState, useCallback } from "react";
import Reqursive from "@/components/features/reqursive-render/reqursive";
import type { ContentNode } from "@/components/features/reqursive-render/types";
import { translateContentTree } from "@/components/features/reqursive-render/translateContentTree";
import { TreeBuilder as ContentTreeBuilder } from "@/components/features/reqursive-render/treeBuilder";
import TreeBuilderPanel from "@/components/features/reqursive-render/tree-builder/treeBuilder";
import { NODE_TEMPLATES, type NodeTemplate } from "./mockNodeTemplates";
import mockContentTreeJson from "@/components/features/reqursive-render/mock-data/mock-content-tree.json";
import styles from "./page.module.scss";

const FALLBACK_TREE: ContentNode = { type: "ROOT", id: "root", parameters: {}, children: [] };
const MOCK_TREE: ContentNode = translateContentTree(mockContentTreeJson) ?? FALLBACK_TREE;

export default function BuildRenderTreePage() {
  const [tree, setTree] = useState<ContentNode>(MOCK_TREE);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("root");

  const handleAddNode = useCallback((template: NodeTemplate) => {
    const newNode: ContentNode = {
      type: template.type,
      id: `${template.type.toLowerCase()}-${Date.now()}`,
      parameters: template.defaultParameters,
      children: [],
    };
    const builder = new ContentTreeBuilder(structuredClone(tree));
    builder.addNode(selectedNodeId, newNode);
    setTree(builder.tree);
  }, [tree, selectedNodeId]);

  const handleRemoveNode = useCallback((nodeId: string) => {
    const builder = new ContentTreeBuilder(structuredClone(tree));
    builder.removeNode(nodeId);
    setTree(builder.tree);
    if (selectedNodeId === nodeId) setSelectedNodeId("root");
  }, [tree, selectedNodeId]);

  return (
    <div className={styles.layout}>
      <aside className={styles.panel}>
        <header className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Preview</h2>
          <p className={styles.panelSubtitle}>Live render of the current tree</p>
        </header>
        <div className={styles.panelBody}>
          {tree.children.length === 0 ? (
            <p className={styles.empty}>No nodes added yet.</p>
          ) : (
            <Reqursive node={tree} />
          )}
        </div>
      </aside>

      <TreeBuilderPanel
        tree={tree}
        selectedNodeId={selectedNodeId}
        onSelectNode={setSelectedNodeId}
        onRemoveNode={handleRemoveNode}
      />

      <aside className={styles.panel}>
        <header className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Components</h2>
          <p className={styles.panelSubtitle}>Click to add to selected node</p>
        </header>
        <div className={styles.panelBody}>
          <ul className={styles.templateList}>
            {NODE_TEMPLATES.map((template) => (
              <li key={template.type}>
                <button
                  className={styles.templateButton}
                  onClick={() => handleAddNode(template)}
                >
                  <p className={styles.templateLabel}>{template.label}</p>
                  <p className={styles.templateDescription}>{template.description}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
