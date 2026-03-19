import { RenderNodeProps } from "../types";
import styles from "./renderParagraph.module.scss";

export default function RenderParagraph({ node, children }: RenderNodeProps) {
  return (
    <section className={styles.container}>
      <p className={styles.text}>{node.id}</p>
      {children ? <div className={styles.children}>{children}</div> : null}
    </section>
  );
}
