import { Song } from "../../spotyfi-utils/mock-song";
import AudioPlayback from "../audio-playback/audioPlayback";
import styles from "./songCard.module.scss";
import Link from "next/link";

type SongCardProps = { song: Song };

export function SongCard(props: SongCardProps) {
  return (
    <div className={styles.container}>
      {props.song.preview_url && <AudioPlayback src={props.song.preview_url} />}
      <div>
        <Link href={`/song/${props.song.id}`}>
          <div className={styles.name}>{props.song.name}</div>
        </Link>

        <Link href={`/artist/${props.song.id}`}>
          <div className={styles.artist}>{props.song.artists[0].name}</div>
        </Link>
      </div>
      <div className={styles.time}>
        {mlsToMinutesAndSeconds(props.song.duration_ms)}
      </div>
    </div>
  );
}

function mlsToMinutesAndSeconds(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export const song: Song = {
  id: "3n3Ppam7vgaVa1iaRUc9Lp",
  name: "Mr. Brightside",
  duration_ms: 222075,
  explicit: false,
  popularity: 85,
  preview_url: "https://p.scdn.co/mp3-preview/...",
  track_number: 2,
  disc_number: 1,
  is_local: false,
  external_urls: {
    spotify: "https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp",
  },
  artists: [
    {
      id: "0C0XlULifJtAgn6ZNCW2eu",
      name: "The Killers",
      type: "artist",
    },
  ],
  album: {
    id: "4BbsHmXEghoPPevQjPnHXx",
    name: "Hot Fuss",
    release_date: "2004-06-07",
    total_tracks: 11,
  },
  type: "track",
};
