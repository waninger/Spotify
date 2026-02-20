import { Artist } from "../../spotyfi-utils/mock-artist";
import styles from "./artistCard.module.scss";
import Link from "next/link";

type ArtistCardProps = { artist: Artist };
export function ArtistCard(props: ArtistCardProps) {
  return (
    <div className={styles.container}>
      <div>
        <Link href={`/spotify/artist/${props.artist.id}`}>
          <div className={styles.name}>{props.artist.name}</div>
        </Link>

        <Link href={`/spotify/artist/${props.artist.id}`}>
          <div className={styles.artist}>{props.artist.name}</div>
        </Link>
      </div>
    </div>
  );
}