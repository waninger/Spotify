import { RenderNodeProps } from "../../types";
import styles from "./renderParagraph.module.scss";

export default function RenderParagraph({ node, children }: RenderNodeProps) {
  const text =
    typeof node.parameters.text === "string" && node.parameters.text.length > 0
      ? node.parameters.text
      : node.id;

  return (
    <section className={styles.container}>
      <p className={styles.text}>{text}</p>
      {children ? <div className={styles.children}>{children}</div> : null}
    </section>
  );
}
