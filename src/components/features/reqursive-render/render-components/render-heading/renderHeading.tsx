import { RenderNodeProps } from "../../types";
import styles from "./renderHeading.module.scss";

export default function RenderHeading({ node, children }: RenderNodeProps) {
  const headingText =
    typeof node.parameters.text === "string" && node.parameters.text.length > 0
      ? node.parameters.text
      : node.id;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{headingText}</h2>
      {children ? <div className={styles.children}>{children}</div> : null}
    </section>
  );
}
