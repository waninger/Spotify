import styles from "./page.module.scss";
import { artistProvider } from "@/repositories/repositoryIndex";
import { Artist } from "@/types/artist";
import { ArtistCard } from "@/components/features/artists/artist-card/artistCard";

type ArtistPageProps = {
  params: Promise<{
    artistId: string;
  }>;
};
export default async function ArtistPage({ params }: ArtistPageProps) {
  const { artistId } = await params;
  console.log("Artist ID:", artistId);
  const artist: Artist | null = (await artistProvider.getOne(artistId)) ?? null;

  return (
    <>
      <div className={styles.container}>
        {artist && <ArtistCard artist={artist} />}
      </div>
    </>
  );
}
