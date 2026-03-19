import { RenderNodeProps } from "../../types";
import styles from "./renderList.module.scss";

export default function RenderList({ node, children }: RenderNodeProps) {
  const title = typeof node.parameters.title === "string" ? node.parameters.title : null;

  return (
    <section className={styles.container}>
      {title ? <p className={styles.title}>{title}</p> : null}
      <ul className={styles.list}>{children}</ul>
    </section>
  );
}
