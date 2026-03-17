import { auth } from "@/auth";
import { Playlist } from "@/types/playlist";
import { Song } from "@/mock-data/mock-song";
import { Album } from "@/mock-data/mock-album";
import { PlaylistCard } from "@/components/features/playlists/playlist-card/playlistCard";
import LoggedInHero from "@/components/shared/hero/logged-in-hero/loggedInHero";
import { playlistProvider, songProvider, albumProvider } from "@/repositories/repositoryIndex";
import SearchBar from "@/components/shared/search-bar/searchBar";
import { Link } from "@/components/ui/Link/link";
import styles from "./page.module.scss";

export default async function Spotify() {
  const session = await auth();
  const user = session?.user;
  const email = user?.email ?? null;

  /* ── Unauthenticated ───────────────────────────────────────── */
  if (!email) {
    return (
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Your music, your way.</h1>
          <p className={styles.heroSubtitle}>
            Search millions of songs, build playlists, and listen to previews —
            all in one place.
          </p>
          <div className={styles.heroActions}>
            <Link href="/api/auth/signin" variant="button" size="lg">
              Sign in to get started
            </Link>
          </div>
        </div>
        <div className={styles.heroSearch}>
          <SearchBar />
        </div>
      </div>
    );
  }

  /* ── Authenticated ─────────────────────────────────────────── */
  const playlists: Playlist[] | null = await playlistProvider.getAll(email);

  /* Fetch cover art: batch songs then batch albums — max 2 API calls */
  let coverMap = new Map<string, string | null>();
  if (playlists && playlists.length > 0) {
    const firstSongIds = [
      ...new Set(playlists.filter((p) => p.songs.length > 0).map((p) => p.songs[0])),
    ];
    const songs: Song[] | null =
      firstSongIds.length > 0 ? await songProvider.getMany(firstSongIds) : null;

    if (songs) {
      const albumIds = [...new Set(songs.map((s) => s.album.id))];
      const albums: Album[] | null =
        albumIds.length > 0 ? await albumProvider.getMany(albumIds) : null;

      const albumById = new Map(albums?.map((a) => [a.id, a]) ?? []);
      const songById = new Map(songs.map((s) => [s.id, s]));

      coverMap = new Map(
        playlists.map((p) => {
          const song = songById.get(p.songs[0]);
          const album = song ? albumById.get(song.album.id) : null;
          return [p.id, album?.images?.[0]?.url ?? null];
        }),
      );
    }
  }

  const featuredPlaylists = (playlists ?? []).slice(0, 3);
  const featuredPlaylistItems = featuredPlaylists.map((playlist) => ({
    playlist,
    coverUrl: coverMap.get(playlist.id) ?? null,
  }));
  const totalSongs = (playlists ?? []).reduce((sum, playlist) => sum + playlist.songs.length, 0);
  const userName = user?.name?.split(" ")[0] ?? "there";

  return (
    <div className={styles.container}>
      <LoggedInHero
        userName={userName}
        playlistCount={playlists?.length ?? 0}
        totalSongs={totalSongs}
        featuredPlaylists={featuredPlaylistItems}
      />

      <SearchBar />

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Your playlists</h2>
          <Link href="/playlist" variant="subtle" size="sm" underline="hover">
            See all
          </Link>
        </div>

        {playlists && playlists.length > 0 ? (
          <div className={styles.playlistGrid}>
            {playlists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                coverUrl={coverMap.get(playlist.id)}
                variant="wide"
              />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyText}>You have no playlists yet.</p>
            <Link href="/playlist" variant="button" size="sm">
              Create your first playlist
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
