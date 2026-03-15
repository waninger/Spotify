"use client";

import { useState } from "react";
import styles from "./removeSongButton.module.scss";
import { useRouter } from "next/navigation";
type RemoveSongButtonProps = {
  playlistId: string;
  songId: string;
  onRemoved?: () => void;
};

export default function RemoveSongButton({
  playlistId,
  songId,
  onRemoved,
}: RemoveSongButtonProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const router = useRouter();
  const handleRemoveSong = async () => {
    if (!playlistId || !songId || isRemoving) {
      return;
    }

    setIsRemoving(true);

    try {
      const response = await fetch(
        `/api/playlists/${playlistId}/songs/${songId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to remove song from playlist");
      }

      onRemoved?.();
    } catch (error) {
      console.error("Error removing song from playlist:", error);
      alert("Failed to remove song");
    } finally {
      setIsRemoving(false);
      router.refresh();
    }
  };

  return (
    <button
      type="button"
      onClick={handleRemoveSong}
      disabled={isRemoving}
      className={styles.removeButton}
      aria-busy={isRemoving}
    >
      {isRemoving ? "..." : "-"}
    </button>
  );
}
