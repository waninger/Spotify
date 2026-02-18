import { Song, song } from "../spotyfi-utils/mock-song";
import { Artist, artist } from "../spotyfi-utils/mock-artist";
import { mockSearchResult } from "../spotyfi-utils/mock-search-result";
import {
  SongService,
  AlbumService,
  ArtistService,
  SearchService,
  SearchResult,
  SearchType,
} from "./interfaces";
import { Album, album } from "../spotyfi-utils/mock-album";
import { getSpotifyAccessToken } from "@/repositories/accessToken";

const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

export const spotifySearchService: SearchService = {
  async search(
    query: string,
    type: SearchType,
    limit?: number,
  ): Promise<SearchResult | null> {
    const accessToken = await getSpotifyAccessToken();
    const url = `${SPOTIFY_API_BASE_URL}/search?q=${encodeURIComponent(query)}&type=${type}&limit=${limit || 20}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) {
      console.error(
        `Spotify API error: ${response.status} ${response.statusText}`,
      );
      return null;
    }
    const data = await response.json();
    return data as SearchResult;
  },
};

export const spotifySongService: SongService = {
  async getOne(id: string): Promise<Song | null> {
    console.log(`Fetching song with ID: ${id}`);
    const accessToken = await getSpotifyAccessToken();
    const url = `${SPOTIFY_API_BASE_URL}/tracks/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) {
      console.error(
        `Spotify API error: ${response.status} ${response.statusText}`,
      );
      return null;
    }
    const data = await response.json();
    console.log("Fetched song data:", data);
    return data as Song;
  },
  async getMany(ids: string[]): Promise<Song[] | null> {
    const accessToken = await getSpotifyAccessToken();
    const url = `${SPOTIFY_API_BASE_URL}/tracks?ids=${ids.join(",")}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) {
      console.error(
        `Spotify API error: ${response.status} ${response.statusText}`,
      );
      return null;
    }
    const data = await response.json();
    return data.tracks as Song[];
  },
};

export const spotyfiAlbumService: AlbumService = {
  async getOne(id: string): Promise<Album | null> {
    console.log(`Fetching album with ID: ${id}`);
    const accessToken = await getSpotifyAccessToken();
    const url = `${SPOTIFY_API_BASE_URL}/albums/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) {
      console.error(
        `Spotify API error: ${response.status} ${response.statusText}`,
      );
      return null;
    }
    const data = await response.json();
    console.log("Fetched album data:", data);
    return data as Album;
  },
  async getMany(ids: string[]): Promise<Album[] | null> {
    const accessToken = await getSpotifyAccessToken();
    const url = `${SPOTIFY_API_BASE_URL}/albums?ids=${ids.join(",")}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!response.ok) {
      console.error(
        `Spotify API error: ${response.status} ${response.statusText}`,
      );
      return null;
    }
    const data = await response.json();
    return data.albums as Album[];
  },
};

export const spotifyMockSongService: SongService = {
  async getOne(id: string): Promise<Song | null> {
    console.log(id);
    return song;
  },
  async getMany(ids: string[]): Promise<Song[] | null> {
    console.log(ids);
    throw new Error("Function not implemented.");
  },
};

export const spotyfiMockArtistService: ArtistService = {
  async getOne(id: string): Promise<Artist | null> {
    console.log(id);
    return artist;
    throw new Error("Function not implemented.");
  },
  async getMany(ids: string[]): Promise<Artist[] | null> {
    console.log(ids);
    throw new Error("Function not implemented.");
  },
};

export const spotyfiMockAlbumService: AlbumService = {
  async getOne(id: string): Promise<Album | null> {
    console.log(id);
    return album;
    throw new Error("Function not implemented.");
  },
  async getMany(ids: string[]): Promise<Album[] | null> {
    console.log(ids);
    throw new Error("Function not implemented.");
  },
};

export const spotifyMockSearchService: SearchService = {
  async search(
    query: string,
    type: SearchType,
    limit?: number,
  ): Promise<SearchResult | null> {
    return mockSearchResult;
    console.log(query, type, limit);
    throw new Error("Function not implemented.");
  },
};
