"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import styles from "./searchBar.module.scss";


export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }
  
  async function handleSearchSubmit(query: string) {
    redirect(`/search?query=${encodeURIComponent(query)}`);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSearchSubmit(searchTerm);
      }} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search for songs, artists, albums..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>Search</button>
      </form>
    </div>
  );
}
