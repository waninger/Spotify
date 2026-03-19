import { RenderNodeProps } from "../types";
import styles from "./renderListItem.module.scss";

export default function RenderListItem({ node, children }: RenderNodeProps) {
  return (
    <li className={styles.item}>
      <span className={styles.label}>{node.id}</span>
      {children ? <div className={styles.children}>{children}</div> : null}
    </li>
  );
}
