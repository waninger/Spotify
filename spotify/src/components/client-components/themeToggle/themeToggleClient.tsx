"use client";

import { useState } from "react";
import { Theme, THEMES } from "../../../types/theme";
import styles from "./themeToggle.module.scss";

type Props = {
  theme?:Theme
}

export default function ThemeToggleClient({theme:initialTheme = 'system' as Theme }:Props) {

  const [theme, setTheme] = useState<Theme>(initialTheme);

  const updateThem = async (newTheme: Theme) => {
    const prevTheme = theme;

    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);

    try {
      const res = await fetch("/api/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: newTheme }),
      });

      if (!res.ok) {
        setTheme(prevTheme);
        document.documentElement.setAttribute("data-theme", prevTheme);
        console.error("Theme update failed:", await res.text());
      }
    } catch (error) {
      setTheme(prevTheme);
      document.documentElement.setAttribute("data-theme", prevTheme);
      console.error("Failed to update theme:", error);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    updateThem(value as Theme);
  };

  return (
    <div className={styles.themeToggle}>
      <label htmlFor="theme">Theme:</label>
      <select
        id="theme"
        className={styles.select}
        value={theme}
        onChange={handleChange}
      >
        {THEMES.map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
