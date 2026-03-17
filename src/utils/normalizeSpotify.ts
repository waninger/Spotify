import { Album } from "@/mock-data/mock-album";
import { Artist } from "@/mock-data/mock-artist";
import { Song } from "@/mock-data/mock-song";

type RawSpotifyImage = {
  url?: string | null;
  width?: number | null;
  height?: number | null;
};

type RawSpotifyArtistSummary = {
  id?: string | null;
  name?: string | null;
  type?: string | null;
};

type RawSpotifyAlbumSummary = {
  id?: string | null;
  name?: string | null;
  release_date?: string | null;
  total_tracks?: number | null;
};

type RawSpotifyTrackSummary = {
  id?: string | null;
  name?: string | null;
  duration_ms?: number | null;
  explicit?: boolean | null;
  track_number?: number | null;
  type?: string | null;
};

type RawSpotifyExternalUrls = {
  spotify?: string | null;
};

export type RawSpotifyArtist = {
  id?: string | null;
  name?: string | null;
  genres?: string[] | null;
  popularity?: number | null;
  followers?: {
    total?: number | null;
  } | null;
  images?: RawSpotifyImage[] | null;
  external_urls?: RawSpotifyExternalUrls | null;
  type?: string | null;
};

export type RawSpotifyAlbum = {
  id?: string | null;
  name?: string | null;
  album_type?: string | null;
  total_tracks?: number | null;
  release_date?: string | null;
  release_date_precision?: string | null;
  genres?: string[] | null;
  popularity?: number | null;
  label?: string | null;
  images?: RawSpotifyImage[] | null;
  artists?: RawSpotifyArtistSummary[] | null;
  tracks?: {
    items?: RawSpotifyTrackSummary[] | null;
    limit?: number | null;
    offset?: number | null;
    total?: number | null;
  } | null;
  external_urls?: RawSpotifyExternalUrls | null;
  type?: string | null;
};

export type RawSpotifySong = {
  id?: string | null;
  name?: string | null;
  duration_ms?: number | null;
  explicit?: boolean | null;
  popularity?: number | null;
  preview_url?: string | null;
  track_number?: number | null;
  disc_number?: number | null;
  is_local?: boolean | null;
  external_urls?: RawSpotifyExternalUrls | null;
  artists?: RawSpotifyArtistSummary[] | null;
  album?: RawSpotifyAlbumSummary | null;
  type?: string | null;
};

function normalizeString(value: string | null | undefined, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function normalizeNumber(value: number | null | undefined, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function normalizeImages(images: RawSpotifyImage[] | null | undefined): Artist["images"] {
  return (images ?? [])
    .filter((image): image is RawSpotifyImage & { url: string } => typeof image?.url === "string")
    .map((image) => ({
      url: image.url,
      width: normalizeNumber(image.width),
      height: normalizeNumber(image.height),
    }));
}

function normalizeArtistSummaries(
  artists: RawSpotifyArtistSummary[] | null | undefined,
): Song["artists"] {
  return (artists ?? [])
    .filter(
      (entry): entry is RawSpotifyArtistSummary & { id: string; name: string } =>
        typeof entry?.id === "string" && typeof entry?.name === "string",
    )
    .map((entry) => ({
      id: entry.id,
      name: entry.name,
      type: "artist" as const,
    }));
}

export function normalizeArtist(raw: RawSpotifyArtist): Artist {
  return {
    id: normalizeString(raw.id),
    name: normalizeString(raw.name, "Unknown artist"),
    genres: Array.isArray(raw.genres) ? raw.genres.filter((genre): genre is string => typeof genre === "string") : [],
    popularity: normalizeNumber(raw.popularity),
    followers: {
      total: normalizeNumber(raw.followers?.total),
    },
    images: normalizeImages(raw.images),
    external_urls: {
      spotify: normalizeString(raw.external_urls?.spotify),
    },
    type: "artist",
  };
}

export function normalizeAlbum(raw: RawSpotifyAlbum): Album {
  return {
    id: normalizeString(raw.id),
    name: normalizeString(raw.name, "Unknown album"),
    album_type: normalizeString(raw.album_type, "album"),
    total_tracks: normalizeNumber(raw.total_tracks),
    release_date: normalizeString(raw.release_date),
    release_date_precision: normalizeString(raw.release_date_precision, "day"),
    genres: Array.isArray(raw.genres) ? raw.genres.filter((genre): genre is string => typeof genre === "string") : [],
    popularity: normalizeNumber(raw.popularity),
    label: normalizeString(raw.label),
    images: normalizeImages(raw.images),
    artists: normalizeArtistSummaries(raw.artists),
    tracks: {
      items: (raw.tracks?.items ?? [])
        .filter(
          (track): track is RawSpotifyTrackSummary & { id: string; name: string } =>
            typeof track?.id === "string" && typeof track?.name === "string",
        )
        .map((track) => ({
          id: track.id,
          name: track.name,
          duration_ms: normalizeNumber(track.duration_ms),
          explicit: Boolean(track.explicit),
          track_number: normalizeNumber(track.track_number),
          type: "track" as const,
        })),
      limit: normalizeNumber(raw.tracks?.limit),
      offset: normalizeNumber(raw.tracks?.offset),
      total: normalizeNumber(raw.tracks?.total),
    },
    external_urls: {
      spotify: normalizeString(raw.external_urls?.spotify),
    },
    type: "album",
  };
}

export function normalizeSong(raw: RawSpotifySong): Song {
  return {
    id: normalizeString(raw.id),
    name: normalizeString(raw.name, "Unknown track"),
    duration_ms: normalizeNumber(raw.duration_ms),
    explicit: Boolean(raw.explicit),
    popularity: normalizeNumber(raw.popularity),
    preview_url: typeof raw.preview_url === "string" ? raw.preview_url : null,
    track_number: normalizeNumber(raw.track_number),
    disc_number: normalizeNumber(raw.disc_number, 1),
    is_local: Boolean(raw.is_local),
    external_urls: {
      spotify: normalizeString(raw.external_urls?.spotify),
    },
    artists: normalizeArtistSummaries(raw.artists),
    album: {
      id: normalizeString(raw.album?.id),
      name: normalizeString(raw.album?.name),
      release_date: normalizeString(raw.album?.release_date),
      total_tracks: normalizeNumber(raw.album?.total_tracks),
    },
    type: "track",
  };
}