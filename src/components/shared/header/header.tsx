import Link from "next/link";
import styles from "./header.module.scss";
import LoginButton from "../../client-components/loginButton/loginButton";
import ThemeToggle from "../../client-components/themeToggle/themeToggle";
import { ReactElement } from "react";

export default async function Header(): Promise<ReactElement<unknown, string>> {

  return (
    <header className={styles.header}>
      <a href="#site-nav" className={styles.menuBurger} aria-label="Open menu">
        ☰
      </a>

      <nav id="site-nav" className={styles.nav} aria-label="Primary navigation">
        <a href="#" className={styles.closeNav} aria-label="Close menu">
          ×
        </a>
        <ul className={styles.navList}>
          <li>
            <Link href="/" className={styles.link}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/search" className={styles.link}>
              Search
            </Link>
          </li> 
          <li>
            <Link href="/playlist" className={styles.link}>
              Playlist
            </Link>
          </li> 
        </ul>
      </nav>

      <a href="#" className={styles.backdrop} aria-hidden="true" />

      <div className={styles.utils}>
        <ThemeToggle />
        <LoginButton />
      </div>
    </header>
  );
}
