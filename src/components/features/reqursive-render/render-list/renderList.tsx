import { RenderNodeProps } from "../types";
import styles from "./renderList.module.scss";

export default function RenderList({ children }: RenderNodeProps) {
  return <ul className={styles.list}>{children}</ul>;
}
