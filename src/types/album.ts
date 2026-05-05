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
  images: {
    height: number;
    width: number;
    url: string;
  }[];
  artists: {
    id: string;
    name: string;
    type: "artist";
  }[];
  tracks: {
    items: {
      id: string;
      name: string;
      duration_ms: number;
      explicit: boolean;
      track_number: number;
      type: "track";
    }[];
    limit: number;
    offset: number;
    total: number;
  };
  external_urls: {
    spotify: string;
  };
  type: "album";
};

