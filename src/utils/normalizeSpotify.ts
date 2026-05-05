import { Album } from "@/types/album";
import { Artist, ArtistAlbumItem, ArtistAlbums } from "@/types/artist";
import { Song } from "@/types/song";
/**
 * This module provides functions to normalize raw data from the Spotify API into consistent application-specific types.
 * It includes helper functions to handle common normalization tasks such as string and number validation, as well as specific logic for artists, albums, and tracks.
 * The normalization process ensures that the application can work with predictable data structures, even when the Spotify API responses may have missing or malformed fields.
 */

type RawSpotifyImage = {
  url?: string | null;
  width?: number | null;
  height?: number | null;
};

type RawSpotifyArtistSummary = {
  id?: string | null;
  name?: string | null;
  type?: string | null;
  href?: string | null;
  uri?: string | null;
  external_urls?: RawSpotifyExternalUrls | null;
};

type RawSpotifyAlbumSummary = {
  id?: string | null;
  name?: string | null;
  album_type?: string | null;
  release_date?: string | null;
  release_date_precision?: string | null;
  total_tracks?: number | null;
  images?: RawSpotifyImage[] | null;
  external_urls?: RawSpotifyExternalUrls | null;
  href?: string | null;
  uri?: string | null;
  artists?: RawSpotifyArtistSummary[] | null;
};

type RawSpotifyTrackSummary = {
  id?: string | null;
  name?: string | null;
  duration_ms?: number | null;
  explicit?: boolean | null;
  track_number?: number | null;
  disc_number?: number | null;
  uri?: string | null;
  href?: string | null;
  preview_url?: string | null;
  is_local?: boolean | null;
  external_urls?: RawSpotifyExternalUrls | null;
  artists?: RawSpotifyArtistSummary[] | null;
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
  uri?: string | null;
  images?: RawSpotifyImage[] | null;
  artists?: RawSpotifyArtistSummary[] | null;
  tracks?: {
    href?: string | null;
    items?: RawSpotifyTrackSummary[] | null;
    limit?: number | null;
    next?: string | null;
    offset?: number | null;
    previous?: string | null;
    total?: number | null;
  } | null;
  copyrights?: {
    text?: string | null;
    type?: string | null;
  }[] | null;
  external_urls?: RawSpotifyExternalUrls | null;
  type?: string | null;
};


/**Return data for /tracks/${id} */
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
  is_playable?: boolean | null;
  uri?: string | null;
  href?: string | null;
  available_markets?: string[] | null;
  external_urls?: RawSpotifyExternalUrls | null;
  external_ids?: {
    isrc?: string | null;
    ean?: string | null;
    upc?: string | null;
  } | null;
  restrictions?: {
    reason?: string | null;
  } | null;
  artists?: RawSpotifyArtistSummary[] | null;
  album?: RawSpotifyAlbumSummary | null;
  type?: string | null;
};

export type RawSpotifyArtistAlbums = {
  href?: string | null;
  limit?: number | null;
  next?: string | null;
  offset?: number | null;
  previous?: string | null;
  total?: number | null;
  items?: RawSpotifyArtistAlbumItem[] | null;
};

export type RawSpotifyArtistAlbumItem = {
  album_type?: string | null;
  total_tracks?: number | null;
  external_urls?: RawSpotifyExternalUrls | null;
  href?: string | null;
  id?: string | null;
  images?: RawSpotifyImage[] | null;
  name?: string | null;
  release_date?: string | null;
  release_date_precision?: string | null;
  restrictions?: {
    reason?: string | null;
  } | null;
  type?: string | null;
  uri?: string | null;
  artists?: RawSpotifyArtistAlbumItemArtist[] | null;
};

export type RawSpotifyArtistAlbumItemArtist = {
  external_urls?: RawSpotifyExternalUrls | null;
  href?: string | null;
  id?: string | null;
  name?: string | null;
  type?: string | null;
  uri?: string | null;
};

/**Helper function to normalize string values */
function normalizeString(value: string | null | undefined, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

/**Helper function to normalize number values */
function normalizeNumber(value: number | null | undefined, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

/**Helper function to normalize Spotify image data */
function normalizeImages(images: RawSpotifyImage[] | null | undefined): Artist["images"] {
  return (images ?? [])
    .filter((image): image is RawSpotifyImage & { url: string } => typeof image?.url === "string")
    .map((image) => ({
      url: image.url,
      width: normalizeNumber(image.width),
      height: normalizeNumber(image.height),
    }));
}

/**Helper function to normalize artist summary data */
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
      href: normalizeString(entry.href),
      uri: normalizeString(entry.uri),
      external_urls: {
        spotify: normalizeString(entry.external_urls?.spotify),
      },
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
    uri: normalizeString(raw.uri),
    images: normalizeImages(raw.images),
    artists: (raw.artists ?? []).filter(
      (a): a is RawSpotifyArtistSummary & { id: string; name: string } =>
        typeof a?.id === "string" && typeof a?.name === "string",
    ).map((a) => ({
      id: a.id,
      name: a.name,
      type: "artist" as const,
      href: normalizeString(a.href),
      uri: normalizeString(a.uri),
      external_urls: { spotify: normalizeString(a.external_urls?.spotify) },
    })),
    tracks: {
      href: normalizeString(raw.tracks?.href),
      limit: normalizeNumber(raw.tracks?.limit),
      offset: normalizeNumber(raw.tracks?.offset),
      next: raw.tracks?.next ?? null,
      previous: raw.tracks?.previous ?? null,
      total: normalizeNumber(raw.tracks?.total),
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
          disc_number: normalizeNumber(track.disc_number, 1),
          uri: normalizeString(track.uri),
          preview_url: typeof track.preview_url === "string" ? track.preview_url : null,
          external_urls: { spotify: normalizeString(track.external_urls?.spotify) },
          artists: (track.artists ?? []).filter(
            (a): a is RawSpotifyArtistSummary & { id: string; name: string } =>
              typeof a?.id === "string" && typeof a?.name === "string",
          ).map((a) => ({
            id: a.id,
            name: a.name,
            type: "artist" as const,
            href: normalizeString(a.href),
            uri: normalizeString(a.uri),
            external_urls: { spotify: normalizeString(a.external_urls?.spotify) },
          })),
          type: "track" as const,
        })),
    },
    copyrights: (raw.copyrights ?? []).map((c) => ({
      text: normalizeString(c.text),
      type: normalizeString(c.type),
    })),
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
    is_playable: raw.is_playable !== false,
    uri: normalizeString(raw.uri),
    external_urls: {
      spotify: normalizeString(raw.external_urls?.spotify),
    },
    artists: normalizeArtistSummaries(raw.artists),
    album: {
      id: normalizeString(raw.album?.id),
      name: normalizeString(raw.album?.name),
      album_type: normalizeString(raw.album?.album_type, "album"),
      release_date: normalizeString(raw.album?.release_date),
      total_tracks: normalizeNumber(raw.album?.total_tracks),
      images: normalizeImages(raw.album?.images),
    },
    type: "track",
  };
}

export function normalizeArtistAlbums(raw: RawSpotifyArtistAlbums): ArtistAlbums {
  return {
    href: normalizeString(raw.href),
    limit: normalizeNumber(raw.limit),
    next: normalizeString(raw.next),
    offset: normalizeNumber(raw.offset),
    previous: normalizeString(raw.previous),
    total: normalizeNumber(raw.total),
    items: (raw.items ?? [])
      .filter(
        (item): item is RawSpotifyArtistAlbumItem & { id: string; name: string } =>
          typeof item?.id === "string" && typeof item?.name === "string",
      )
      .map(normalizeArtistAlbumItem),
  };
}

export function normalizeArtistAlbumItem(raw: RawSpotifyArtistAlbumItem): ArtistAlbumItem {
  return {
    album_type: normalizeString(raw.album_type, "album"),
    total_tracks: normalizeNumber(raw.total_tracks),
    external_urls: {
      spotify: normalizeString(raw.external_urls?.spotify),
    },
    href: normalizeString(raw.href),
    id: normalizeString(raw.id),
    images: normalizeImages(raw.images),
    name: normalizeString(raw.name, "Unknown album"),
    release_date: normalizeString(raw.release_date),
    release_date_precision: normalizeString(raw.release_date_precision, "day"),
    restrictions: raw.restrictions
      ? {
          reason: normalizeString(raw.restrictions.reason),
        }
      : undefined,
    type: "album",
    uri: normalizeString(raw.uri),
    artists: (raw.artists ?? [])
      .filter(
        (artist): artist is RawSpotifyArtistAlbumItemArtist & { id: string; name: string } =>
          typeof artist?.id === "string" && typeof artist?.name === "string",
      )
      .map((artist) => ({
        external_urls: {
          spotify: normalizeString(artist.external_urls?.spotify),
        },
        href: normalizeString(artist.href),
        id: normalizeString(artist.id),
        name: normalizeString(artist.name, "Unknown artist"),
        type: "artist" as const,
        uri: normalizeString(artist.uri),
      })),
  };
}