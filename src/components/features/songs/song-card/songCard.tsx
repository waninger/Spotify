import { Song } from "../../../../spotyfi-utils/mock-song";
import AudioPlayback from "../audio-playback/audioPlayback";
import styles from "./songCard.module.scss";
import { Link } from "../../../ui/Link/link";
import AddSongModal from "../add-song-modal/addSongModal";

type SongCardProps = { song: Song };

export function SongCard(props: SongCardProps) {
  return (
    <div className={styles.container}>
      {props.song.preview_url ? <AudioPlayback src={props.song.preview_url} /> : <div className={styles.filler}/>}
      <div>
        <Link href={`/song/${props.song.id}`} variant="plain" underline="none" className={styles.name}>
          {props.song.name}
        </Link>

        <Link href={`/artist/${props.song.id}`} variant="plain" underline="none" className={styles.artist}>
          {props.song.artists[0].name}
        </Link>
      </div>
      <div className={styles.time}>
        {mlsToMinutesAndSeconds(props.song.duration_ms)}
      </div>
      <AddSongModal songId={props.song.id} />
    </div>
  );
}

function mlsToMinutesAndSeconds(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}