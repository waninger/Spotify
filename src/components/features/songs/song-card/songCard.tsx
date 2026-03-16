import { Song } from "../../../../spotyfi-utils/mock-song";
import AudioPlayback from "../audio-playback/audioPlayback";
import styles from "./songCard.module.scss";
import { Link } from "../../../ui/Link/link";
import AddSongModal from "../add-song-modal/addSongModal";

export type SongCardVariant = "default" | "compact" | "detail" | "search";

type SongCardProps = {
  song: Song;
  variant?: SongCardVariant;
  /** Used by compact variant to show a leading track number */
  index?: number;
};

export function SongCard({ song, variant = "default", index }: SongCardProps) {
  const containerClass = [
    styles.container,
    styles[`variant-${variant}`],
  ].join(" ");

  return (
    <div className={containerClass}>

      {/* --- Leading col: track number (compact) or audio player (default/detail) --- */}
      {variant === "compact" ? (
        <span className={styles.trackNumber}>{index ?? song.track_number}</span>
      ) : (
        song.preview_url
          ? <AudioPlayback src={song.preview_url} />
          : <div className={styles.filler} />
      )}

      {/* --- Main info --- */}
      <div className={styles.info}>
        <div className={styles.nameRow}>
          <Link href={`/song/${song.id}`} variant="plain" size="md" underline="hover" className={styles.name}>
            {song.name}
          </Link>
          {song.explicit && <span className={styles.explicit}>E</span>}
        </div>

        <div className={styles.subRow}>
          <Link href={`/artist/${song.artists[0].id}`} variant="plain" size="sm" underline="hover" className={styles.artist}>
            {song.artists[0].name}
          </Link>

          {/* album name shown in detail + search variants */}
          {(variant === "detail" || variant === "search") && (
            <>
              <span className={styles.separator}>·</span>
              <Link href={`/album/${song.album.id}`} variant="subtle" size="sm" underline="hover" className={styles.album}>
                {song.album.name}
              </Link>
            </>
          )}
        </div>
      </div>

      {/* --- Trailing col --- */}
      <div className={styles.trailing}>
        <span className={styles.time}>{mlsToMinutesAndSeconds(song.duration_ms)}</span>

        {/* Open on Spotify — detail variant only */}
        {variant === "detail" && song.external_urls.spotify && (
          <Link
            href={song.external_urls.spotify}
            variant="subtle"
            size="sm"
            underline="hover"
            external
            className={styles.spotifyLink}
          >
            Open in Spotify
          </Link>
        )}

        <AddSongModal songId={song.id} />
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