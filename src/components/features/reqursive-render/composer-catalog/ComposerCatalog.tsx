import type { ContentNode } from "@/components/features/reqursive-render/types";
import styles from "./ComposerCatalog.module.scss";

type ComposerCatalogProps = {
  components: ContentNode[];
  selectedNodeType: string;
  onInsertComponent: (component: ContentNode) => void;
};

function formatNodeTypeLabel(type: ContentNode["type"]): string {
  return type
    .toLowerCase()
    .split("_")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

export default function ComposerCatalog({
  components,
  selectedNodeType,
  onInsertComponent,
}: ComposerCatalogProps) {
  return (
    <aside className={styles.panel}>
      <header className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>Components</h2>
        <p className={styles.panelSubtitle}>Insert a node under the selected {selectedNodeType}</p>
      </header>
      <div className={styles.panelBody}>
        {components.length === 0 ? (
          <p className={styles.empty}>No component templates available.</p>
        ) : (
          <ul className={styles.templateList}>
            {components.map((component) => (
              <li key={component.id} className={styles.templateItem}>
                <button
                  type="button"
                  className={styles.templateButton}
                  onClick={() => onInsertComponent(component)}
                >
                  <p className={styles.templateLabel}>{formatNodeTypeLabel(component.type)}</p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
