import { PlaylistCard } from "../../components/features/playlists/playlist-card/playlistCard";
import styles from "./page.module.scss";
import { playlistProvider } from "../../repositories/repositoryIndex";
import SearchBar from "../../components/shared/search-bar/searchBar";
import CreatePlaylistModal from "../../components/client-components/create-playlist-modal/CreatePlaylistModal";
import { auth } from "@/auth";


export default async function Playlist() {
  const session = await auth();
  const user = session?.user;
  const email = user?.email ? user.email : null;

  const playlists = email ? (await playlistProvider.getAll(email)) : null;

  return (
    <>
      <div className={styles.container}>
        <SearchBar />
         <h1 className={styles.heading}>Your Playlists</h1>
        <ol className={styles.playlistList}>
          {playlists &&
            playlists.map((playlist) => (
              <li key={playlist.id} className={styles.listItem}>
                <PlaylistCard playlist={playlist} />
              </li>
            ))}
        </ol>
        <CreatePlaylistModal />
      </div>
    </>
  );
}
