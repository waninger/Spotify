import { songProvider } from "@/repositories/repositoryIndex";
import { auth } from "@/auth";
import { Song } from "@/mock-data/mock-song";
import { SongCard } from "@/components/features/songs/song-card/songCard";
import { albumProvider } from "@/repositories/repositoryIndex";
import { Album } from "@/mock-data/mock-album";
import Image from "next/image";
import styles from "./page.module.scss";
import SearchBar from "@/components/shared/search-bar/searchBar";
import { playlistProvider } from "@/repositories/repositoryIndex";
import RemoveSongButton from "@/components/features/songs/remove-song-button/removeSongButton";

type PlaylistProps = {
  params: {
    playlistId: string;
  };
};

export default async function Playlist({ params }: PlaylistProps) {
  const session = await auth();
  const user = session?.user;
  const email = user?.email ? user.email : null;
  const playlistId = (await params).playlistId;
  console.log("Playlist ID:", playlistId);

  const playlist = email
    ? await playlistProvider.getList(playlistId, email)
    : null;
  console.log("Playlist songs:", playlist?.songs);
  const songs: Song[] | null = playlist?.songs
    ? await songProvider.getMany(playlist.songs)
    : null;
  const albumId: string | null = songs ? songs[0]?.album?.id : null;
  const album: Album | null = albumId
    ? await albumProvider.getOne(albumId)
    : null;

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
                <RemoveSongButton
                  playlistId={playlistId}
                  songId={song.id}
                />
              </li>
            ))}
        </ol>
      </div>
    </>
  );
}
