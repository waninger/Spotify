import { SearchResultAlbum, SearchResultArtist, SearchResultSong } from "../../repositories/interfaces";
import { convertSearchResultSongToSong, convertSearchResultAlbumToAlbum, convertSearchResultArtistToArtist } from "../../utils/convertSearchResult";
import { SongCard } from "../song-card/songCard";
import { AlbumCard } from "../album-card/albumCard";
import { ArtistCard } from "../artist-card/artistCard";
type SearchResultProps = {
  result: (SearchResultSong | SearchResultArtist | SearchResultAlbum);
};

export default async function SearchResult({ result }: SearchResultProps) {


  switch (result.type) {
    case "track": return <SongCard song={convertSearchResultSongToSong(result as SearchResultSong)} />;
      break;
    case "album":
      return <AlbumCard album={convertSearchResultAlbumToAlbum(result as SearchResultAlbum)} />;
      break;
    case "artist":
      return <ArtistCard artist={convertSearchResultArtistToArtist(result as SearchResultArtist)} />;
      break;
    default:
      break;
  }
  return <div>Unknown result type</div>;
}