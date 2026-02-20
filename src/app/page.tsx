import { songProvider } from "../repositories/repositoryIndex";
import { Song } from "../spotyfi-utils/mock-song";
import { SongCard } from "../components/song-card/songCard";
import { albumProvider } from "../repositories/repositoryIndex";
import { Album } from "../spotyfi-utils/mock-album";
import Image from "next/image";
import styles from "./page.module.scss";
import SearchBar from "../components/search-bar/searchBar";

export default async function Spotify() {
  const album: Album | null = (await albumProvider.getOne("test")) ?? null;
  const song: Song | null = (await songProvider.getOne("62BxlOvQCjLNQA5ARA4Dug")) ?? null;
  return (
    <>
      <div className={styles.container}>
        <SearchBar />
        {album && (
          <>
            <div className={styles.imageWrapper}>
              <Image
                src={album.images[0].url}
                alt={album.name}
                fill={true}
                sizes="(max-width: 768px) 90vw, 320px"
                priority
              /> 
            </div>
            <div className={styles.heading}>
              <div className={styles.albumName}>{album.name}</div>
              <div className={styles.albumArtist}>{album.artists[0].name}</div>
            </div>
          </>
        )}
        <ol className={styles.songList}>
          {song &&
            Array.from({ length: 10 }).map((_, index) => (
              <li key={index} className={styles.listItem}>
                <p>{index + 1}</p>
                <SongCard song={song} />
              </li>
            ))}
        </ol>
      </div>
    </>
  );
}
