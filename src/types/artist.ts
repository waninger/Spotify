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