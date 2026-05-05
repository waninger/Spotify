import { Song } from "@/types/song";
import styles from "./songCard.module.scss";
import { Link } from "@/components/ui/Link/link";
import AddSongModal from "@/components/features/songs/add-song-modal/addSongModal";
import Image from "next/image";

export type SongCardVariant = "default" | "compact" | "detail" | "search";

type SongCardProps = {
  song: Song;
  variant?: SongCardVariant;
  /** Used by compact variant to show a leading track number */
  index?: number;
  children?: React.ReactNode;
};

export function SongCard({ song, variant = "default", index, children }: SongCardProps) {
  const containerClass = [
    styles.container,
    styles[`variant-${variant}`],
    !song.is_playable ? styles.unavailable : "",
  ].join(" ");

  const showThumbnail = variant !== "compact" && song.album.images[0]?.url;

  return (
    <div className={containerClass}>

      {/* --- Album thumbnail (non-compact) --- */}
      {showThumbnail && (
        <div className={styles.thumbnail}>
          <Image
            src={song.album.images[0].url}
            alt={song.album.name}
            width={40}
            height={40}
            className={styles.thumbnailImage}
          />
        </div>
      )}

      {/* --- Main info --- */}
      <div className={styles.info}>
        <div className={styles.nameRow}>
          {variant === "compact" && (
            <span className={styles.trackNumber}>{index ?? song.track_number}</span>
          )}
          <Link href={`/song/${song.id}`} variant="plain" size="md" underline="hover" className={styles.name}>
            {song.name}
          </Link>
          {song.explicit && <span className={styles.explicit}>E</span>}
        </div>

        <div className={styles.subRow}>
          {song.artists.map((artist, i) => (
            <span key={artist.id} className={styles.artistItem}>
              <Link href={`/artist/${artist.id}`} variant="plain" size="sm" underline="hover" className={styles.artist}>
                {artist.name}
              </Link>
              {i < song.artists.length - 1 && <span className={styles.separator}>·</span>}
            </span>
          ))}

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
        <AddSongModal songId={song.id} />
      </div>

      {children && <div className={styles.children}>{children}</div>}
    </div>
  );
}

function mlsToMinutesAndSeconds(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}