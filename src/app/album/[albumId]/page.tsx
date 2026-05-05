import styles from "./page.module.scss";
import { albumProvider } from "@/repositories/repositoryIndex";
import { Album } from "@/types/album";
import { Song } from "@/types/song";
import Image from "next/image";
import { Link } from "@/components/ui/Link/link";
import { SongCard } from "@/components/features/songs/song-card/songCard";

type AlbumPageProps = {
  params: Promise<{
    albumId: string;
  }>;
};

function trackToSong(track: Album["tracks"]["items"][number], album: Album): Song {
  return {
    id: track.id,
    name: track.name,
    duration_ms: track.duration_ms,
    explicit: track.explicit,
    popularity: 0,
    preview_url: track.preview_url,
    track_number: track.track_number,
    disc_number: track.disc_number,
    is_local: false,
    is_playable: true,
    uri: track.uri,
    external_urls: track.external_urls,
    artists: track.artists as Song["artists"],
    album: {
      id: album.id,
      name: album.name,
      album_type: album.album_type,
      release_date: album.release_date,
      total_tracks: album.total_tracks,
      images: album.images,
    },
    type: "track",
  };
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { albumId } = await params;
  const album: Album | null = (await albumProvider.getOne(albumId)) ?? null;

  if (!album) {
    return (
      <div className={styles.container}>
        <p className={styles.notFound}>No album found.</p>
      </div>
    );
  }

  const coverUrl = album.images[0]?.url ?? null;
  const releaseYear = album.release_date.slice(0, 4);
  const hasMultipleDiscs = album.tracks.items.some((t) => t.disc_number > 1);
  const discs = hasMultipleDiscs
    ? [...new Set(album.tracks.items.map((t) => t.disc_number))].sort()
    : null;

  return (
    <div className={styles.container}>
      {/* Hero image */}
      {coverUrl && (
        <div className={styles.imageWrapper}>
          <Image
            src={coverUrl}
            alt={`Cover for ${album.name}`}
            fill
            sizes="(max-width: 768px) 90vw, 320px"
            priority
          />
        </div>
      )}

      {/* Heading */}
      <div className={styles.heading}>
        <span className={styles.albumType}>{album.album_type}</span>
        <h1 className={styles.albumName}>{album.name}</h1>
        <div className={styles.artists}>
          {album.artists.map((artist, i) => (
            <span key={artist.id}>
              <Link href={`/artist/${artist.id}`} variant="plain" size="md" underline="hover">
                {artist.name}
              </Link>
              {i < album.artists.length - 1 && <span className={styles.dot}>·</span>}
            </span>
          ))}
        </div>
        <div className={styles.subMeta}>
          <span>{releaseYear}</span>
          <span className={styles.dot}>·</span>
          <span>{album.total_tracks} tracks</span>
        </div>
      </div>

      {/* Tracklist */}
      <ol className={styles.songList}>
        {discs
          ? discs.flatMap((disc) => [
              <li key={`disc-${disc}`} className={styles.discHeading}>
                Disc {disc}
              </li>,
              ...album.tracks.items
                .filter((t) => t.disc_number === disc)
                .map((track) => (
                  <li key={track.id} className={styles.listItem}>
                    <SongCard song={trackToSong(track, album)} variant="compact" />
                  </li>
                )),
            ])
          : album.tracks.items.map((track) => (
              <li key={track.id} className={styles.listItem}>
                <SongCard song={trackToSong(track, album)} variant="compact" />
              </li>
            ))}
      </ol>
    </div>
  );
}
