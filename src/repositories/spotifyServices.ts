import { Song, song } from "@/mock-data/mock-song";
import { Artist, artist } from "@/mock-data/mock-artist";
import { mockSearchResult } from "@/mock-data/mock-search-result";
import {
  SongService,
  AlbumService,
  ArtistService,
  SearchService,
  SearchResult,
  SearchType,
} from "@/repositories/interfaces";
import { Album, album } from "@/mock-data/mock-album";
import { getSpotifyAccessToken } from "@/repositories/accessToken";

const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";
const SEARCH_REVALIDATE_SECONDS = 5 * 60;
const ENTITY_REVALIDATE_SECONDS = 15 * 60;

function dedupeIds(ids: string[]): string[] {
  return [...new Set(ids.filter(Boolean))];
}

async function fetchSpotifyJson<T>(
  path: string,
  revalidateSeconds: number,
): Promise<T | null> {
  let accessToken: string;

  try {
    accessToken = await getSpotifyAccessToken();
  } catch (error) {
    console.error("Error fetching Spotify access token:", error);
    return null;
  }

  const response = await fetch(`${SPOTIFY_API_BASE_URL}${path}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { revalidate: revalidateSeconds },
  });

  if (!response.ok) {
    console.error(`Spotify API error: ${response.status} ${response.statusText}`);
    return null;
  }

  return (await response.json()) as T;
}

export const spotifySearchService: SearchService = {
  async search(
    query: string,
    type: SearchType,
    limit?: number,
  ): Promise<SearchResult | null> {
    const normalizedQuery = query.trim();
    const normalizedLimit = limit || 20;

    return fetchSpotifyJson<SearchResult>(
      `/search?q=${encodeURIComponent(normalizedQuery)}&type=${type}&limit=${normalizedLimit}`,
      SEARCH_REVALIDATE_SECONDS,
    );
  },
};

export const spotifySongService: SongService = {
  async getOne(id: string): Promise<Song | null> {
    return fetchSpotifyJson<Song>(`/tracks/${id}`, ENTITY_REVALIDATE_SECONDS);
  },
  async getMany(ids: string[]): Promise<Song[]> {
    const uniqueIds = dedupeIds(ids);
    if (uniqueIds.length === 0) return [];

    const songs = await Promise.all(
      uniqueIds.map((id) =>
        fetchSpotifyJson<Song>(`/tracks/${id}`, ENTITY_REVALIDATE_SECONDS),
      ),
    );

    return songs.filter((song): song is Song => song !== null);
  },
};

export const spotyfiAlbumService: AlbumService = {
  async getOne(id: string): Promise<Album | null> {
    return fetchSpotifyJson<Album>(`/albums/${id}`, ENTITY_REVALIDATE_SECONDS);
  },
  async getMany(ids: string[]): Promise<Album[] | null> {
    const uniqueIds = dedupeIds(ids);
    if (uniqueIds.length === 0) return [];

    const albums = await Promise.all(
      uniqueIds.map((id) =>
        fetchSpotifyJson<Album>(`/albums/${id}`, ENTITY_REVALIDATE_SECONDS),
      ),
    );

    return albums.filter((album): album is Album => album !== null);
  },
};

export const spotyfiArtistService: ArtistService = {
  async getOne(id: string): Promise<Artist | null> {
    return fetchSpotifyJson<Artist>(`/artists/${id}`, ENTITY_REVALIDATE_SECONDS);
  },
  async getMany(ids: string[]): Promise<Artist[] | null> {
    const uniqueIds = dedupeIds(ids);
    if (uniqueIds.length === 0) return [];

    const artists = await Promise.all(
      uniqueIds.map((id) =>
        fetchSpotifyJson<Artist>(`/artists/${id}`, ENTITY_REVALIDATE_SECONDS),
      ),
    );

    return artists.filter((artist): artist is Artist => artist !== null);
  },
};

export const spotifyMockSongService: SongService = {
  async getOne(id: string): Promise<Song | null> {
    console.log(id);
    return song;
  },
  async getMany(ids: string[]): Promise<Song[] | null> {
    console.log(ids);
    const songs: Song[] = ids.map((id) => ({ ...song, id }));
    return songs;
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
