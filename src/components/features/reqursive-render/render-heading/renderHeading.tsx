import { RenderNodeProps } from "../types";
import styles from "./renderHeading.module.scss";

export default function RenderHeading({ node, children }: RenderNodeProps) {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{node.id}</h2>
      {children ? <div className={styles.children}>{children}</div> : null}
    </section>
  );
}
