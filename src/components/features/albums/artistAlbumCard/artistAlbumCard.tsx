import { ArtistAlbumItem } from "@/types/artist";
import styles from "./artistAlbumCard.module.scss";
import { Link } from "@/components/ui/Link/link";
import Image from "next/image";

type ArtistAlbumCardProps = {
  album: ArtistAlbumItem;
};
const DEFAULT_COVER_URL = "/images/default-album-cover.png";
const DEFAULT_RELEASE_YEAR = "Unknown Year";

export function ArtistAlbumCard({ album }: ArtistAlbumCardProps) {
  if (!album) return null;
  const coverUrl = album.images[0]?.url || DEFAULT_COVER_URL;
  const releaseYear = album.release_date
    ? album.release_date.slice(0, 4)
    : DEFAULT_RELEASE_YEAR;

  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={`Cover for ${album.name}`}
            className={styles.coverImage}
            width={400}
            height={400}
          />
        ) : (
          <div className={styles.coverFallback} aria-hidden="true" />
        )}
      </div>

      <div className={styles.info}>
        <Link
          href={`/album/${album.id}`}
          variant="plain"
          size="md"
          underline="hover"
          className={styles.name}
        >
          {album.name}
        </Link>

        <div className={styles.subRow}>
          <span className={styles.meta}>{releaseYear}</span>
          <span className={styles.separator}>-</span>
          <span className={styles.meta}>{album.total_tracks} tracks</span>
        </div>
      </div>
    </div>
  );
}
