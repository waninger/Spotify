"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./CreatePlaylistModal.module.scss";

export default function CreatePlaylistModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const router = useRouter();

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const createPlaylist = async () => {
    if (!newPlaylistName.trim()) return;

    try {
      const res = await fetch("/api/playlists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newPlaylistName.trim() }),
      });

      if (res.ok) {
        const newPlaylist = await res.json();
        console.log("Playlist created:", newPlaylist);
        setNewPlaylistName("");
        setIsOpen(false);
        router.refresh();
      } else {
        console.error("Failed to create playlist");
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={toggleModal} className={styles.openButton}>
        Create New Playlist
      </button>

      {isOpen && (
        <div className={styles.modalBackdrop} onClick={() => setIsOpen(false)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles.modalTitle}>Create New Playlist</h2>
            <input
              type="text"
              placeholder="Playlist Name"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              className={styles.input}
            />

            <button
              onClick={createPlaylist}
              disabled={!newPlaylistName}
              className={styles.addButton}
            >
              Create Playlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
