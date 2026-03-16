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
import { getSpotifyAccessToken } from "../repositories/accessToken";

const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

export const spotifySearchService: SearchService = {
  async search(
    query: string,
    type: SearchType,
    limit?: number,
  ): Promise<SearchResult | null> {
    console.log(`Fetching search with: ${query} ${type} ${limit}`);
    let accessToken: string;
    try {
      accessToken = await getSpotifyAccessToken();
    } catch (error) {
      console.error("Error fetching Spotify access token:", error);
      return null;
    }

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
    console.log("Fetched search data:", data);
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
  async getMany(ids: string[]): Promise<Song[]> {
    const songs = await Promise.all(ids.map((id) => this.getOne(id)));
    return songs.filter((song): song is Song => song !== null);
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

export const spotyfiArtistService: ArtistService = {
  async getOne(id: string): Promise<Artist | null> {
    console.log(`Fetching artist with ID: ${id}`);
    const accessToken = await getSpotifyAccessToken();
    const url = `${SPOTIFY_API_BASE_URL}/artists/${id}`;
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
    console.log("Fetched artist data:", data);
    return data as Artist;
  },
  async getMany(ids: string[]): Promise<Artist[] | null> {
    const accessToken = await getSpotifyAccessToken();
    const url = `${SPOTIFY_API_BASE_URL}/artists?ids=${ids.join(",")}`;
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
    return data.artists as Artist[];
  },
};

export const spotifyMockSongService: SongService = {
  async getOne(id: string): Promise<Song | null> {
    console.log(id);
    return song;
  },
  async getMany(ids: string[]): Promise<Song[] | null> {
    console.log(ids);
    const songs: Song[] = Array(5).fill(song)
    return songs
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
    return [album, album, album];
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
