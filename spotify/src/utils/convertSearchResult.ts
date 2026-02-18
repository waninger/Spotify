import { Album } from "../spotyfi-utils/mock-album";
import { Artist } from "../spotyfi-utils/mock-artist";
import { Song } from "../spotyfi-utils/mock-song";
import { SearchResultAlbum, SearchResultArtist, SearchResultSong } from "../repositories/interfaces";

export function convertSearchResultAlbumToAlbum(searchAlbum: SearchResultAlbum): Album {
    console.log("Converting SearchResultAlbum to Album:", searchAlbum);
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

export function convertSearchResultAlbumsToAlbums(searchAlbums: SearchResultAlbum[]): Album[] {
  return searchAlbums.map(convertSearchResultAlbumToAlbum);
}

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

export function convertSearchResultSongsToSongs(searchSongs: SearchResultSong[]): Song[] {
  return searchSongs.map(convertSearchResultSongToSong);
}