"use client";
import { useState} from "react";
import { useSession } from "next-auth/react";
import { Playlist } from "@/types/playlist";
import styles from "./addSongModal.module.scss";

interface AddSongModalProps {
  songId: string;
}

export default function AddSongModal({ songId }: AddSongModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>("");
  const { data: session } = useSession();

  const fetchPlaylists = async () => {
    try {
      const res = await fetch("/api/playlists");
      if (res.ok) {
        const data = await res.json();
        setPlaylists(data || []);
      }
    } catch (error) {
      console.error("Failed to fetch playlists:", error);
    }
  };

  const toggleModal = () => {
    setIsOpen((prev) => !prev);

    if(!isOpen && session?.user?.email) {
      fetchPlaylists();
    }
  };

  const addSong = async () => {
    if (!selectedPlaylist) return;
    try {
      const res = await fetch(`/api/playlists/${selectedPlaylist}/songs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songId }),
      });
      if (res.ok) {
        setIsOpen(false);
      } else {
        alert("Failed to add song");
      }
    } catch (error) {
      console.error("Error adding song:", error);
    }
  };

  const removeSong = async () => {
    if (!selectedPlaylist) return;
    try {
      const res = await fetch(`/api/playlists/${selectedPlaylist}/songs/${songId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Song removed!");
        setIsOpen(false);
      } else {
        alert("Failed to remove song");
      }
    } catch (error) {
      console.error("Error removing song:", error);
    }
  };

  return (
    <>
      <button onClick={toggleModal} className={styles.openButton}>
        +
      </button>

      {isOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Manage Song in Playlist</h2>
            <select
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
              className={styles.select}
            >
              <option value="">Select a playlist</option>
              {playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>
            <div className={styles.buttonGroup}>
              <button
                onClick={addSong}
                disabled={!selectedPlaylist}
                className={`${styles.button} ${styles.addButton}`}
              >
                Add Song
              </button>
              <button
                onClick={removeSong}
                disabled={!selectedPlaylist}
                className={`${styles.button} ${styles.removeButton}`}
              >
                Remove Song
              </button>
              <button
                onClick={toggleModal}
                className={`${styles.button} ${styles.closeButton}`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}