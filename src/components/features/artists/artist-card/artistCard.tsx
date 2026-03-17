import { Artist } from "@/mock-data/mock-artist";
import styles from "./artistCard.module.scss";
import { Link } from "@/components/ui/Link/link";

type ArtistCardVariant = "default" | "search";

type ArtistCardProps = {
  artist: Artist;
  variant?: ArtistCardVariant;
};

export function ArtistCard({ artist, variant = "default" }: ArtistCardProps) {
  const imageUrl = artist.images[0]?.url;
  const topGenre = artist.genres?.[0] || "Artist";
  const followers = formatFollowers(artist.followers.total);
  const containerClass = [styles.container, styles[`variant-${variant}`]].join(" ");

  return (
    <div className={containerClass}>
      <div className={styles.avatar}>
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={`Photo of ${artist.name}`} className={styles.avatarImage} />
        ) : (
          <div className={styles.avatarFallback} aria-hidden="true" />
        )}
      </div>

      <div className={styles.info}>
        <Link href={`/artist/${artist.id}`} variant="plain" size="md" underline="hover" className={styles.name}>
          {artist.name}
        </Link>

        <div className={styles.subRow}>
          <span className={styles.meta}>{topGenre}</span>
          <span className={styles.separator}>-</span>
          <span className={styles.meta}>Popularity {artist.popularity}</span>
          {variant === "default" && (
            <>
              <span className={styles.separator}>-</span>
              <span className={styles.meta}>{followers} followers</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function formatFollowers(total: number): string {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(total);
}