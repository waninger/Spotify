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
  external_urls: {
    spotify: string;
  };
  artists: {
    id: string;
    name: string;
    type: "artist";
  }[];
  album: {
    id: string;
    name: string;
    release_date: string;
    total_tracks: number;
  };
  type: "track";
};