import { Album } from "../../spotyfi-utils/mock-album";
import styles from "./albumCard.module.scss";
import Link from "next/link";

type AlbumCardProps = { album: Album };

export function AlbumCard(props: AlbumCardProps) {
  return (
    <div className={styles.container}>
      <div>
        <Link href={`/spotify/album/${props.album.id}`}>
          <div className={styles.name}>{props.album.name}</div>
        </Link>

        <Link href={`/spotify/album/${props.album.artists[0].id}`}>
          <div className={styles.artist}>{props.album.artists[0].name}</div>
        </Link>
      </div>
    </div>
  );
}