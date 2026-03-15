import styles from "./page.module.scss";
import { songProvider } from "../../../repositories/repositoryIndex";
import { Song } from "../../../spotyfi-utils/mock-song";
import { SongCard } from "@/components/features/songs/song-card/songCard";

type SongPageProps = {
  params: {
    songId: string;
  };
};
export default async function SongPage({ params }: SongPageProps) {
  const paramsValue = await params;
  const id = await paramsValue.songId;
  const song: Song | null = (await songProvider.getOne(id)) ?? null;
  return (
  <div className={styles.container}>
    {song ? (
      <SongCard song={song} />
    ) : (
      <p>No song found for ID: {id}</p>
    )}
  </div>
);
}
