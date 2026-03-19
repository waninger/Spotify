import { RenderNodeProps } from "../../types";
import styles from "./renderImage.module.scss";

export default function RenderImage({ node }: RenderNodeProps) {
  const url = typeof node.parameters.url === "string" ? node.parameters.url : "";
  const alt = typeof node.parameters.alt === "string" ? node.parameters.alt : node.id;
  const caption = typeof node.parameters.caption === "string" ? node.parameters.caption : null;

  if (!url) {
    return null;
  }

  return (
    <figure className={styles.container}>
      <img className={styles.image} src={url} alt={alt} />
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}