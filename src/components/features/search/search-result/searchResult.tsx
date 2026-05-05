import { Song } from "@/types/song";
import { Album } from "@/types/album";
import { Artist } from "@/types/artist";
import { SongCard } from "@/components/features/songs/song-card/songCard";
import { AlbumCard } from "@/components/features/albums/albumCard/albumCard";
import { ArtistCard } from "@/components/features/artists/artistCard/artistCard";

type SearchResultItem = Song | Album | Artist;

type SearchResultProps = {
  result: SearchResultItem;
};

export default function SearchResult({ result }: SearchResultProps) {

  switch (result.type) {
    case "track":
      return <SongCard song={result} variant="search" />;
    case "album":
      return <AlbumCard album={result} variant="search" />;
    case "artist":
      return <ArtistCard artist={result} variant="search" />;
    default:
      return null;
  }

  return <div>Unknown result type</div>;
}