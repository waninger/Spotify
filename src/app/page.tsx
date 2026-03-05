import { songProvider } from "../repositories/repositoryIndex";
import { auth } from "@/auth";
import { Song } from "../spotyfi-utils/mock-song";
import { SongCard } from "../components/song-card/songCard";
import { albumProvider } from "../repositories/repositoryIndex";
import { Album } from "../spotyfi-utils/mock-album";
import Image from "next/image";
import styles from "./page.module.scss";
import SearchBar from "../components/search-bar/searchBar";
import { Playlist } from "@/types/playList";
import { playlistProvider } from "../repositories/repositoryIndex";

export default async function Spotify() {
  const session = await auth();
  const user = session?.user
  const playlists : Playlist[] | null = user?.email ? (await playlistProvider.getAll(user.email)) : null
  const playlist : Playlist | null =  playlists?.length ? playlists[0] : null; 
  const songs: Song[] | null = playlist?.songs ? (await songProvider.getMany(playlist.songs)) : null;
  const albumId: string | null = songs ? songs[0]?.album?.id : null; 
  const album: Album | null = albumId ? (await albumProvider.getOne(albumId)) : null;

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
          {songs &&
            songs.map((song, index) => (
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
