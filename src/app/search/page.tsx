import { musicSearchProvider } from "@/repositories/repositoryIndex";
import { SearchResultAlbum, SearchResultArtist, SearchResultSong, SearchType } from "@/repositories/interfaces";
import SearchResult from "@/components/search-result/searchResult";
import SearchBar from "../../components/search-bar/searchBar";
import styles from "./page.module.scss";


type SearchPageProps = {
  searchParams: { query: string };
};
const LIMIT = 10;
const DEFAULT_QUERY = "top 10 hits";

export default async function Search({ searchParams }: SearchPageProps) {
  const searchTerms = await searchParams;
  const query = searchTerms.query;

  const result = await musicSearchProvider.search(
    query ?? DEFAULT_QUERY,
    "track" as SearchType,
    LIMIT,
  );

  function handleSearchSubmit(query: string) {
    console.log("Search submitted for query:", query);
  }
  handleSearchSubmit(query);
  return (
    <div className={styles.container}>
      <SearchBar />
      Search Results Page for query: {query ?? "No query provided"}
      {result ? result.tracks?.items.map((item: SearchResultSong) => (
        <SearchResult key={item.id} result={item} />))
      : null}
      {result ? result.albums?.items.map((item: SearchResultAlbum) => (
        <SearchResult key={item.id} result={item} />))
      : null}
      {result ? result.artists?.items.map((item: SearchResultArtist) => (
        <SearchResult key={item.id} result={item} />))
      : null}
    </div>
  );
}
