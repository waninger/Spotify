import Reqursive from "@/components/features/reqursive-render/reqursive";
import { translateContentTree } from "@/components/features/reqursive-render/translateContentTree";
import { getMockContentTreeResponses } from "./mockContentApi";
import styles from "./page.module.scss";

export default async function ReqursiveRenderPage() {
  const responses = await getMockContentTreeResponses();

  const translated = responses.map((entry) => {
    try {
      const node = translateContentTree(entry.payload);
      if (!node) {
        return { name: entry.name, ok: false as const, error: "Root node type is not recognized." };
      }
      return { name: entry.name, ok: true as const, node };
    } catch (error) {
      return {
        name: entry.name,
        ok: false as const,
        error: error instanceof Error ? error.message : "Unknown translation error.",
      };
    }
  });

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Reqursive Render Demo</h1>
        <p className={styles.description}>
          Rendering raw API-like JSON payloads by translating them into local <code>ContentNode</code> types.
        </p>
      </header>

      {translated.map((entry) => (
        <section key={entry.name} className={styles.card}>
          <h2 className={styles.cardTitle}>Fixture: {entry.name}</h2>
          {entry.ok ? (
            <Reqursive node={entry.node} />
          ) : (
            <p className={styles.error}>Translation failed: {entry.error}</p>
          )}
        </section>
      ))}
    </main>
  );
}
