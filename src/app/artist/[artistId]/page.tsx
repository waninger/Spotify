import styles from "./page.module.scss";
import { artistProvider } from "@/repositories/repositoryIndex";
import { Artist, ArtistAlbums, ArtistAlbumItem } from "@/types/artist";
import { ArtistAlbumCard } from "@/components/features/albums/artistAlbumCard/artistAlbumCard";
import Image from "next/image";
type ArtistPageProps = {
  params: Promise<{
    artistId: string;
  }>;
};
export default async function ArtistPage({ params }: ArtistPageProps) {
  const { artistId } = await params;
  console.log("Artist ID:", artistId);
  const artist: Artist | null = (await artistProvider.getOne(artistId)) ?? null;
  const albums: ArtistAlbums | null = artist
    ? await artistProvider.getAlbums(artistId)
    : null;
  const albumItems: ArtistAlbumItem[] = albums?.items || [];
  const artistImageUrl = artist?.images[0]?.url || null;

  return (
    <>
      {artist && (
        <div className={styles.container}>
          <section className={styles.hero}>
            {artistImageUrl ? (
              <Image
                src={artistImageUrl}
                alt={`${artist?.name} image`}
                className={styles.heroImage}
                width={400}
                height={400}
              />
            ) : (
              <div className={styles.heroImageFallback} aria-hidden="true" />
            )}
            <h1>{artist?.name}</h1>
          </section>
          <section className={styles.albumsSection}>
            <h2>Albums</h2>
            <div className={styles.albumsGrid}>
              {albumItems.map((album) => (
                <ArtistAlbumCard key={album.id} album={album} />
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
