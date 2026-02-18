import Link from "next/link";
import styles from "./header.module.scss";
import LoginButton from "../client-components/loginButton/loginButton";
import ThemeToggle from "../client-components/themeToggle/themeToggle";
import { ReactElement } from "react";

export default async function Header(): Promise<ReactElement<unknown, string>> {

  return (
    <header className={styles.header}>
      <input type="checkbox" className={styles.navToggle} id="burger" />
      <label className={styles.menueBurger} htmlFor="burger">
        ☰
      </label>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link href="/" className={styles.link}>
              Home
            </Link>
          </li>    
          <li>
            <Link href="/song" className={styles.link}>
              Song
            </Link>
          </li> 
          <li>
            <Link href="/artist" className={styles.link}>
              Artist
            </Link>
          </li>
          <li>
            <Link href="/search" className={styles.link}>
              Search
            </Link>
          </li> 
        </ul>
      </nav>
      <div className={styles.utils}>
        <ThemeToggle />
        <LoginButton />
      </div>
    </header>
  );
}
