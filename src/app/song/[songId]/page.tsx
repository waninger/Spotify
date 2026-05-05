import styles from "./page.module.scss";
import { songProvider } from "@/repositories/repositoryIndex";
import { Song } from "@/types/song";
import Image from "next/image";
import { Link } from "@/components/ui/Link/link";
import { SongCard } from "@/components/features/songs/song-card/songCard";

type SongPageProps = {
  params: Promise<{
    songId: string;
  }>;
};

export default async function SongPage({ params }: SongPageProps) {
  const { songId } = await params;
  const song: Song | null = (await songProvider.getOne(songId)) ?? null;

  if (!song) {
    return (
      <div className={styles.container}>
        <p className={styles.notFound}>No song found.</p>
      </div>
    );
  }

  const coverUrl = song.album.images[0]?.url ?? null;
  const releaseYear = song.album.release_date.slice(0, 4);
  const showDisc = song.disc_number > 1;

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.cover}>
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={`Cover for ${song.album.name}`}
              width={240}
              height={240}
              className={styles.coverImage}
            />
          ) : (
            <div className={styles.coverFallback} aria-hidden="true" />
          )}
        </div>

        <div className={styles.meta}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{song.name}</h1>
            {song.explicit && <span className={styles.explicit}>E</span>}
          </div>

          <div className={styles.artists}>
            {song.artists.map((artist, i) => (
              <span key={artist.id}>
                <Link href={`/artist/${artist.id}`} variant="plain" size="md" underline="hover">
                  {artist.name}
                </Link>
                {i < song.artists.length - 1 && <span className={styles.dot}>·</span>}
              </span>
            ))}
          </div>

          <div className={styles.albumRow}>
            <Link href={`/album/${song.album.id}`} variant="plain" size="sm" underline="hover">
              {song.album.name}
            </Link>
            <span className={styles.separator}>·</span>
            <span className={styles.detail}>{releaseYear}</span>
            <span className={styles.separator}>·</span>
            <span className={styles.detail}>
              Track {song.track_number} of {song.album.total_tracks}
              {showDisc && `, Disc ${song.disc_number}`}
            </span>
          </div>
        </div>
      </section>

      <section>
        <SongCard song={song} variant="detail" />
      </section>
    </div>
  );
}
