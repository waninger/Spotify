import {
  albumProvider,
  artistProvider,
  musicSearchProvider,
  songProvider,
} from "@/repositories/repositoryIndex";
import Link from "next/link";
import { SearchResultAlbum, SearchResultArtist, SearchResultSong, SearchType } from "@/repositories/interfaces";
import SearchResult from "@/components/features/search/search-result/searchResult";
import SearchBar from "@/components/shared/search-bar/searchBar";
import {
  convertSearchResultAlbumToAlbum,
  convertSearchResultArtistToArtist,
  convertSearchResultSongToSong,
} from "@/utils/convertSearchResult";
import styles from "./page.module.scss";


type SearchPageProps = {
  searchParams: Promise<{ query?: string; view?: string }>;
};
const LIMIT = 10;
const PREVIEW_LIMIT = 5;
const DEFAULT_QUERY = "top 10 hits";
type SearchView = "all" | "songs" | "albums" | "artists";

function normalizeView(view: string | undefined): SearchView {
  if (view === "songs" || view === "albums" || view === "artists") return view;
  return "all";
}

function hrefWithQuery(query: string, view: SearchView): string {
  return `/search?query=${encodeURIComponent(query)}&view=${view}`;
}

export default async function Search({ searchParams }: SearchPageProps) {
  const { query, view } = await searchParams;
  const resolvedQuery = query?.trim() || DEFAULT_QUERY;
  const currentView = normalizeView(view);
  const showSongs = currentView === "all" || currentView === "songs";
  const showAlbums = currentView === "all" || currentView === "albums";
  const showArtists = currentView === "all" || currentView === "artists";

  const [trackResult, albumResult, artistResult] = await Promise.all([
    musicSearchProvider.search(resolvedQuery, "track" as SearchType, LIMIT),
    musicSearchProvider.search(resolvedQuery, "album" as SearchType, LIMIT),
    musicSearchProvider.search(resolvedQuery, "artist" as SearchType, LIMIT),
  ]);

  const trackItems = trackResult?.tracks?.items ?? [];
  const albumItems = albumResult?.albums?.items ?? [];
  const artistItems = artistResult?.artists?.items ?? [];

  const [songs, albums, artists] = await Promise.all([
    songProvider.getMany(trackItems.map((item) => item.id)),
    albumProvider.getMany(albumItems.map((item) => item.id)),
    artistProvider.getMany(artistItems.map((item) => item.id)),
  ]);

  const songsById = new Map((songs ?? []).map((song) => [song.id, song]));
  const albumsById = new Map((albums ?? []).map((album) => [album.id, album]));
  const artistsById = new Map((artists ?? []).map((artist) => [artist.id, artist]));

  const enrichedTracks = trackItems.map(
    (item: SearchResultSong) => songsById.get(item.id) ?? convertSearchResultSongToSong(item),
  );
  const enrichedAlbums = albumItems.map(
    (item: SearchResultAlbum) => albumsById.get(item.id) ?? convertSearchResultAlbumToAlbum(item),
  );
  const enrichedArtists = artistItems.map(
    (item: SearchResultArtist) => artistsById.get(item.id) ?? convertSearchResultArtistToArtist(item),
  );

  const visibleTracks = currentView === "songs"
    ? enrichedTracks
    : enrichedTracks.slice(0, PREVIEW_LIMIT);
  const visibleAlbums = currentView === "albums"
    ? enrichedAlbums
    : enrichedAlbums.slice(0, PREVIEW_LIMIT);
  const visibleArtists = currentView === "artists"
    ? enrichedArtists
    : enrichedArtists.slice(0, PREVIEW_LIMIT);

  return (
    <div className={styles.container}>
      <SearchBar />
      <p className={styles.searchMeta}>Search results for: {resolvedQuery}</p>

      <nav className={styles.filterRow} aria-label="Result type filters">
        <Link href={hrefWithQuery(resolvedQuery, "all")} className={`${styles.filterChip} ${currentView === "all" ? styles.active : ""}`}>
          All
        </Link>
        <Link href={hrefWithQuery(resolvedQuery, "songs")} className={`${styles.filterChip} ${currentView === "songs" ? styles.active : ""}`}>
          Songs
        </Link>
        <Link href={hrefWithQuery(resolvedQuery, "albums")} className={`${styles.filterChip} ${currentView === "albums" ? styles.active : ""}`}>
          Albums
        </Link>
        <Link href={hrefWithQuery(resolvedQuery, "artists")} className={`${styles.filterChip} ${currentView === "artists" ? styles.active : ""}`}>
          Artists
        </Link>
      </nav>

      {showSongs && (
        <section className={styles.section} aria-label="Songs">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Songs</h2>
            {currentView === "all" && enrichedTracks.length > PREVIEW_LIMIT && (
              <Link href={hrefWithQuery(resolvedQuery, "songs")} className={styles.moreLink}>
                Show all songs
              </Link>
            )}
          </div>
          {visibleTracks.length > 0 ? (
            visibleTracks.map((item) => <SearchResult key={`track-${item.id}`} result={item} />)
          ) : (
            <p className={styles.empty}>No songs found. Try a broader term.</p>
          )}
        </section>
      )}

      {showAlbums && (
        <section className={styles.section} aria-label="Albums">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Albums</h2>
            {currentView === "all" && enrichedAlbums.length > PREVIEW_LIMIT && (
              <Link href={hrefWithQuery(resolvedQuery, "albums")} className={styles.moreLink}>
                Show all albums
              </Link>
            )}
          </div>
          {visibleAlbums.length > 0 ? (
            visibleAlbums.map((item) => <SearchResult key={`album-${item.id}`} result={item} />)
          ) : (
            <p className={styles.empty}>No albums found. Try a broader term.</p>
          )}
        </section>
      )}

      {showArtists && (
        <section className={styles.section} aria-label="Artists">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Artists</h2>
            {currentView === "all" && enrichedArtists.length > PREVIEW_LIMIT && (
              <Link href={hrefWithQuery(resolvedQuery, "artists")} className={styles.moreLink}>
                Show all artists
              </Link>
            )}
          </div>
          {visibleArtists.length > 0 ? (
            visibleArtists.map((item) => <SearchResult key={`artist-${item.id}`} result={item} />)
          ) : (
            <p className={styles.empty}>No artists found. Try a broader term.</p>
          )}
        </section>
      )}
    </div>
  );
}
