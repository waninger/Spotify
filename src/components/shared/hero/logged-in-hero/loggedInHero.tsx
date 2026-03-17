import { Playlist } from "@/types/playlist";
import { PlaylistCard } from "@/components/features/playlists/playlist-card/playlistCard";
import { Link } from "@/components/ui/Link/link";
import styles from "./loggedInHero.module.scss";

type FeaturedPlaylist = {
  playlist: Playlist;
  coverUrl: string | null;
};

type LoggedInHeroProps = {
  userName: string;
  playlistCount: number;
  totalSongs: number;
  featuredPlaylists: FeaturedPlaylist[];
};

export default function LoggedInHero({
  userName,
  playlistCount,
  totalSongs,
  featuredPlaylists,
}: LoggedInHeroProps) {
  return (
    <section className={styles.heroLogged}>
      <div className={styles.heroAuraOne} aria-hidden="true" />
      <div className={styles.heroAuraTwo} aria-hidden="true" />

      <div className={styles.heroLeft}>
        <p className={styles.heroEyebrow}>Welcome back, {userName}</p>
        <h1 className={styles.heroMainTitle}>Curate your next soundtrack.</h1>
        <p className={styles.heroMainSubtitle}>
          Search tracks, shape playlists, and jump right back into your favorites.
        </p>

        <div className={styles.heroActionsLogged}>
          <Link href="/search" variant="button" size="lg">
            Search Music
          </Link>
          <Link href="/playlist" underline="none">
            Open Playlists
          </Link>
        </div>

        <div className={styles.heroStats}>
          <div className={styles.heroStatCard}>
            <span className={styles.heroStatValue}>{playlistCount}</span>
            <span className={styles.heroStatLabel}>Playlists</span>
          </div>
          <div className={styles.heroStatCard}>
            <span className={styles.heroStatValue}>{totalSongs}</span>
            <span className={styles.heroStatLabel}>Tracks Saved</span>
          </div>
          <div className={styles.heroStatCard}>
            <span className={styles.heroStatValue}>{featuredPlaylists.length}</span>
            <span className={styles.heroStatLabel}>Featured Now</span>
          </div>
        </div>
      </div>

      <div className={styles.heroRight}>
        <div className={styles.heroRightHeader}>
          <h2 className={styles.heroRightTitle}>Featured Playlists</h2>
        </div>
        {featuredPlaylists.length > 0 ? (
          <div className={styles.heroFeaturedList}>
            {featuredPlaylists.map(({ playlist, coverUrl }) => (
              <PlaylistCard
                key={`hero-${playlist.id}`}
                playlist={playlist}
                coverUrl={coverUrl}
                variant="wide"
              />
            ))}
          </div>
        ) : (
          <div className={styles.heroEmpty}>
            <p className={styles.heroEmptyText}>
              No playlists yet. Start by creating your first one.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
