import { SpotifyImage } from "@/types/artist";

export type Song = {
  id: string;
  name: string;
  duration_ms: number;
  explicit: boolean;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  disc_number: number;
  is_local: boolean;
  is_playable: boolean;
  uri: string;
  external_urls: {
    spotify: string;
  };
  artists: SongArtist[];
  album: SongAlbum;
  type: "track";
};

type SongArtist = {
  id: string;
  name: string;
  type: "artist";
  href: string;
  uri: string;
  external_urls: {
    spotify: string;
  };
};

type SongAlbum = {
  id: string;
  name: string;
  album_type: string;
  release_date: string;
  total_tracks: number;
  images: SpotifyImage[];
};