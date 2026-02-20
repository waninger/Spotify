import { Song } from "../spotyfi-utils/mock-song";
import { Artist } from "../spotyfi-utils/mock-artist";
import { Album } from "../spotyfi-utils/mock-album";

export interface SongService {
  getOne: (id: string) => Promise<Song | null>;
  getMany: (ids: string[]) => Promise<Song[] | null>;
}

export interface ArtistService {
  getOne: (id: string) => Promise<Artist | null>;
  getMany: (ids: string[]) => Promise<Artist[] | null>;
}

export interface AlbumService {
  getOne: (id: string) => Promise<Album | null>;
  getMany: (ids: string[]) => Promise<Album[] | null>;
}

export type SearchType = "track" | "artist" | "album" | "playlist";
export type SearchResult = {
  tracks: {
    href: string;
    items: SearchResultSong[];
    limit: number;
    offset: number;
    total: number;
    next: string;
    previous: null;
  };
  albums: {
    href: string;
    items: SearchResultAlbum[];
    limit: number;
    offset: number;
    total: number;
    next: null;
    previous: null;
  };
  artists: {
    href: string;
    items: SearchResultArtist[];
    limit: number;
    offset: number;
    total: number;
    next: null;
    previous: null;
  };
};

export type SearchResultSong = {
  id: string;
  name: string;
  type: string;
  duration_ms: number;
  explicit: boolean;
  preview_url: string;
  popularity: number;
  artists: {
    id: string;
    name: string;
    type: string;
  }[];
  album: {
    id: string;
    name: string;
    type: string;
    images: {
      url: string;
      width: number;
      height: number;
    }[];
  };
};
export type SearchResultAlbum = {
  id: string;
  name: string;
  album_type: string;
  release_date: string;
  total_tracks: number;
  type: string;
  artists: {
    id: string;
    name: string;
    type: string;
  }[];
  images: {
    url: string;
    width: number;
    height: number;
  }[];
};
export type SearchResultArtist = {
  id: string;
  name: string;
  type: string;
  popularity: number;
  genres: string[];
  images: {
    url: string;
    width: number;
    height: number;
  }[];
};
export interface SearchService {
  search: (
    query: string,
    type: SearchType,
    limit?: number,
  ) => Promise<SearchResult | null>;
};
