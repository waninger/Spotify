import styles from "./playlistCard.module.scss";
import Link from "next/link";
import {Playlist} from "../../../../types/playlist";

type SongCardProps = { playlist: Playlist };

export function PlaylistCard(props: SongCardProps) {
  return (
    <div className={styles.container}>
      <div>
        <Link href={`/playlist/${props.playlist.id}`}>
          <div className={styles.name}>{props.playlist.name}</div>
        </Link>
      </div>
    </div>
  );
}