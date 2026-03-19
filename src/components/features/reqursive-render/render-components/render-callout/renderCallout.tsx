import { RenderNodeProps } from "../../types";
import styles from "./renderCallout.module.scss";

export default function RenderCallout({ node, children }: RenderNodeProps) {
  const title = typeof node.parameters.title === "string" ? node.parameters.title : node.id;
  const text = typeof node.parameters.text === "string" ? node.parameters.text : null;

  return (
    <aside className={styles.container}>
      <p className={styles.title}>{title}</p>
      {text ? <p className={styles.text}>{text}</p> : null}
      {children ? <div className={styles.children}>{children}</div> : null}
    </aside>
  );
}