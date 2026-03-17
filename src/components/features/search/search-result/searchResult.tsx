import { Song } from "@/mock-data/mock-song";
import { Album } from "@/mock-data/mock-album";
import { Artist } from "@/mock-data/mock-artist";
import { SongCard } from "@/components/features/songs/song-card/songCard";
import { AlbumCard } from "@/components/features/albums/album-card/albumCard";
import { ArtistCard } from "@/components/features/artists/artist-card/artistCard";

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
  }

  return <div>Unknown result type</div>;
}