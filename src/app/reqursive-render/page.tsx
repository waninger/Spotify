import Reqursive from "@/components/features/reqursive-render/reqursive";
import styles from "./page.module.scss";
import type { ContentNode } from "@/components/features/reqursive-render/types";
import { contentTreeNodeProvider } from "@/components/features/reqursive-render/providers/providerIndex";

export default async function ReqursiveRenderPage() {
  let tree: ContentNode | null = null;
  try {
    const response = await contentTreeNodeProvider.fetchContentNodeTree();
    tree = response;
  } catch (error) {
    console.error("Failed to fetch content tree:", error);
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Reqursive Render Demo</h1>
        <p className={styles.description}>
          Rendering raw API-like JSON payloads by translating them into local{" "}
          <code>ContentNode</code> types.
        </p>
      </header>

      {tree ? (
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>This is the Content Tree Composer</h2>
          <Reqursive node={tree} />
        </section>
      ) : (
        <p className={styles.error}>Failed to fetch content tree.</p>
      )}
    </main>
  );
}
