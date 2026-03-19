import { RenderNodeProps } from "../../types";
import styles from "./renderListItem.module.scss";

export default function RenderListItem({ node, children }: RenderNodeProps) {
  const label =
    typeof node.parameters.text === "string" && node.parameters.text.length > 0
      ? node.parameters.text
      : node.id;

  return (
    <li className={styles.item}>
      <span className={styles.label}>{label}</span>
      {children ? <div className={styles.children}>{children}</div> : null}
    </li>
  );
}
