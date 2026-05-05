import { SpotifyImage } from "@/types/artist";

type AlbumArtist = {
  id: string;
  name: string;
  type: "artist";
  href: string;
  uri: string;
  external_urls: {
    spotify: string;
  };
};

type AlbumTrack = {
  id: string;
  name: string;
  duration_ms: number;
  explicit: boolean;
  track_number: number;
  disc_number: number;
  uri: string;
  preview_url: string | null;
  external_urls: {
    spotify: string;
  };
  artists: AlbumArtist[];
  type: "track";
};

export type Album = {
  id: string;
  name: string;
  album_type: string;
  total_tracks: number;
  release_date: string;
  release_date_precision: string;
  genres: string[];
  popularity: number;
  label: string;
  uri: string;
  images: SpotifyImage[];
  artists: AlbumArtist[];
  tracks: {
    href: string;
    limit: number;
    offset: number;
    next: string | null;
    previous: string | null;
    total: number;
    items: AlbumTrack[];
  };
  copyrights: {
    text: string;
    type: string;
  }[];
  external_urls: {
    spotify: string;
  };
  type: "album";
};

