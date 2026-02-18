"use client";
import { useRef, useState } from "react";
import styles from "./audioPlayback.module.scss";

type Props = {
  src: string;
};
export default function AudioPlayback({ src }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  return (
    <>
      <audio ref={audioRef} src={src} />
      <button onClick={togglePlay} className={styles.button}>
        {isPlaying ? (
          <svg viewBox="0 0 24 24" className={styles.icon}>
            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className={styles.icon}>
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>
    </>
  );
}
