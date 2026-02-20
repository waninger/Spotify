import styles from "./page.module.scss";
import { artistProvider } from "../../../repositories/repositoryIndex";
import { Artist } from "../../../spotyfi-utils/mock-artist";

type ArtistPageProps = {
  artistId: string;
};
export default async function ArtistPage(ArtistPageProps: ArtistPageProps) {
  const artist: Artist | null =
    (await artistProvider.getOne(ArtistPageProps.artistId)) ?? null;
  return (
    <>
      <div className={styles.container}>
        {artist && <div className={styles.name}>{artist.name}</div>}
      </div>
      <div className={styles.container}>
        {artist && (
          <div className={styles.genre}>{artist.genres.join(", ")}</div>
        )}
      </div>
    </>
  );
}
