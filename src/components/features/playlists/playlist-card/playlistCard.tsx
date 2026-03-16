import styles from "./playlistCard.module.scss";
import { Link } from "../../../ui/Link/link";
import { Playlist } from "../../../../types/playlist";
import Image from "next/image";

export type PlaylistCardVariant = "grid" | "list" | "compact" | "wide";

type PlaylistCardProps = {
  playlist: Playlist;
  variant?: PlaylistCardVariant;
  /** Album art URL from the first song in the playlist */
  coverUrl?: string | null;
};

function PlaylistArt({
  name,
  coverUrl,
  size,
}: {
  name: string;
  coverUrl?: string | null;
  size?: "sm";
}) {
  return (
    <div className={`${styles.art} ${size === "sm" ? styles.artSm : ""}`}>
      {coverUrl ? (
        <Image
          src={coverUrl}
          alt={name}
          fill
          sizes={size === "sm" ? "64px" : "(max-width: 768px) 50vw, 200px"}
          className={styles.artImage}
        />
      ) : (
        <span
          className={`${styles.artLetter} ${
            size === "sm" ? styles.artLetterSm : ""
          }`}
        >
          {name.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}

export function PlaylistCard({
  playlist,
  variant = "grid",
  coverUrl,
}: PlaylistCardProps) {
  const songCount = `${playlist.songs.length} ${
    playlist.songs.length === 1 ? "song" : "songs"
  }`;

  if (variant === "list" || variant === "wide") {
    return (
      <Link
        href={`/playlist/${playlist.id}`}
        variant="plain"
        underline="none"
        className={`${styles.card} ${styles[`variant-${variant}`]}`}
      >
        <PlaylistArt name={playlist.name} coverUrl={coverUrl} size="sm" />
        <div className={styles.info}>
          <span className={styles.name}>{playlist.name}</span>
          <span className={styles.count}>{songCount}</span>
        </div>
        <span className={styles.chevron} aria-hidden="true">›</span>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/playlist/${playlist.id}`}
        variant="plain"
        underline="none"
        className={`${styles.card} ${styles["variant-compact"]}`}
      >
        <div className={styles.info}>
          <span className={styles.name}>{playlist.name}</span>
          <span className={styles.count}>{songCount}</span>
        </div>
        <span className={styles.chevron} aria-hidden="true">›</span>
      </Link>
    );
  }

  // grid (default)
  return (
    <Link
      href={`/playlist/${playlist.id}`}
      variant="plain"
      underline="none"
      className={`${styles.card} ${styles["variant-grid"]}`}
    >
      <PlaylistArt name={playlist.name} coverUrl={coverUrl} />
      <div className={styles.info}>
        <span className={styles.name}>{playlist.name}</span>
        <span className={styles.count}>{songCount}</span>
      </div>
    </Link>
  );
}

/** Drop-in tile for the grid that triggers playlist creation */
export function CreatePlaylistCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.card} ${styles["variant-grid"]} ${styles.createCard}`}
      aria-label="Create new playlist"
    >
      <div className={`${styles.art} ${styles.createArt}`}>
        <span className={styles.createIcon} aria-hidden="true">+</span>
      </div>
      <div className={styles.info}>
        <span className={styles.name}>New playlist</span>
        <span className={styles.count}>Create one</span>
      </div>
    </button>
  );
}