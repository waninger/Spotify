import { Album } from "@/mock-data/mock-album";
import { Artist } from "@/types/artist";
import { Song } from "@/mock-data/mock-song";
import { SearchResultAlbum, SearchResultArtist, SearchResultSong } from "@/repositories/interfaces";


/**
 * Converts a SearchResultAlbum object to an Album object.
 * @param searchAlbum The SearchResultAlbum object to convert.
 * @returns The converted Album object.
 */
export function convertSearchResultAlbumToAlbum(searchAlbum: SearchResultAlbum): Album {
  return {
    id: searchAlbum.id,
    name: searchAlbum.name,
    album_type: searchAlbum.album_type,
    total_tracks: searchAlbum.total_tracks,
    release_date: searchAlbum.release_date,
    release_date_precision: "day",
    genres: [],
    popularity: 0,
    label: "",
    images: searchAlbum.images?.map(img => ({
      height: img.height,
      width: img.width,
      url: img.url
    })),
    artists: searchAlbum.artists?.map(artist => ({
      id: artist.id,
      name: artist.name,
      type: "artist" as const
    })),
    tracks: {
      items: [],
      limit: 0,
      offset: 0,
      total: 0
    },
    external_urls: {
      spotify: ""
    },
    type: "album" as const
  };
}

/**
 * Converts an array of SearchResultAlbum objects to an array of Album objects.
 * @param searchAlbums The array of SearchResultAlbum objects to convert.
 * @returns The converted array of Album objects.
 */
export function convertSearchResultAlbumsToAlbums(searchAlbums: SearchResultAlbum[]): Album[] {
  return searchAlbums.map(convertSearchResultAlbumToAlbum);
}

/**
 * Converts a SearchResultArtist object to an Artist object.
 * @param searchArtist The SearchResultArtist object to convert.
 * @returns The converted Artist object.
 */
export function convertSearchResultArtistToArtist(searchArtist: SearchResultArtist): Artist {
  return {
    id: searchArtist.id,
    name: searchArtist.name,
    genres: searchArtist.genres,
    popularity: searchArtist.popularity,
    followers: {
      total: 0
    },
    images: searchArtist.images.map(img => ({
      height: img.height,
      width: img.width,
      url: img.url
    })),
    external_urls: {
      spotify: ""
    },
    type: "artist" as const
  };
}

export function convertSearchResultArtistsToArtists(searchArtists: SearchResultArtist[]): Artist[] {
  return searchArtists.map(convertSearchResultArtistToArtist);
}

export function convertSearchResultSongToSong(searchSong: SearchResultSong): Song {
  return {
    id: searchSong.id,
    name: searchSong.name,
    duration_ms: searchSong.duration_ms,
    explicit: searchSong.explicit,
    popularity: searchSong.popularity,
    preview_url: searchSong.preview_url || null,
    track_number: 1,
    disc_number: 1,
    is_local: false,
    external_urls: {
      spotify: ""
    },
    artists: searchSong.artists.map(artist => ({
      id: artist.id,
      name: artist.name,
      type: "artist" as const
    })),
    album: {
      id: searchSong.album.id,
      name: searchSong.album.name,
      release_date: new Date().toISOString().split('T')[0],
      total_tracks: 0
    },
    type: "track" as const
  };
}

/**
 * Converts an array of SearchResultSong objects to an array of Song objects.
 * @param searchSongs The array of SearchResultSong objects to convert.
 * @returns The converted array of Song objects.
 */
export function convertSearchResultSongsToSongs(searchSongs: SearchResultSong[]): Song[] {
  return searchSongs.map(convertSearchResultSongToSong);
}