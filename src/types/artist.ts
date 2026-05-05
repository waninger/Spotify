export type Artist = {
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  followers: {
    total: number;
  };
  images: SpotifyImage[];
  external_urls: SpotifyExternalUrls;
  type: "artist";
};

export type SpotifyExternalUrls = {
  spotify: string;
};

export type SpotifyImage = {
  url: string;
  height: number;
  width: number;
};

export type ArtistAlbums = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: ArtistAlbumItem[];
}

export type ArtistAlbumItem = {
  album_type: string;
  total_tracks: number;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: {
    reason: string;
  };
  type: "album";
  uri: string;
  artists: {
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    name: string;
    type: "artist";
    uri: string;
  }[];
}