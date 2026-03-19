import { RenderNodeProps } from "../../types";
import styles from "./renderLinkCard.module.scss";

export default function RenderLinkCard({ node }: RenderNodeProps) {
  const title = typeof node.parameters.title === "string" ? node.parameters.title : node.id;
  const description =
    typeof node.parameters.description === "string" ? node.parameters.description : null;
  const href = typeof node.parameters.href === "string" ? node.parameters.href : null;
  const label = typeof node.parameters.label === "string" ? node.parameters.label : "Open";

  if (!href) {
    return null;
  }

  return (
    <a className={styles.container} href={href} target="_blank" rel="noreferrer">
      <p className={styles.title}>{title}</p>
      {description ? <p className={styles.description}>{description}</p> : null}
      <span className={styles.action}>{label}</span>
    </a>
  );
}