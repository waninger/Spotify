import { Album } from "@/mock-data/mock-album";
import styles from "./albumCard.module.scss";
import { Link } from "@/components/ui/Link/link";

type AlbumCardVariant = "default" | "search";

type AlbumCardProps = {
  album: Album;
  variant?: AlbumCardVariant;
};

export function AlbumCard({ album, variant = "default" }: AlbumCardProps) {
  const coverUrl = album.images[0]?.url;
  const releaseYear = album.release_date?.slice(0, 4) || "-";
  const containerClass = [styles.container, styles[`variant-${variant}`]].join(" ");

  return (
    <div className={containerClass}>
      <div className={styles.cover}>
        {coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={coverUrl} alt={`Cover for ${album.name}`} className={styles.coverImage} />
        ) : (
          <div className={styles.coverFallback} aria-hidden="true" />
        )}
      </div>

      <div className={styles.info}>
        <Link href={`/album/${album.id}`} variant="plain" size="md" underline="hover" className={styles.name}>
          {album.name}
        </Link>

        <div className={styles.subRow}>
          <Link href={`/artist/${album.artists[0].id}`} variant="plain" size="sm" underline="hover" className={styles.artist}>
            {album.artists[0].name}
          </Link>
          <span className={styles.separator}>-</span>
          <span className={styles.meta}>{releaseYear}</span>
          {variant === "default" && (
            <>
              <span className={styles.separator}>-</span>
              <span className={styles.meta}>{album.total_tracks} tracks</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}