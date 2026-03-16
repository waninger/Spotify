"use client";

import { useEffect, useState } from "react";
import { Theme, THEMES } from "@/types/theme";
import styles from "./themeToggle.module.scss";

type Props = {
  theme?: Theme;
};

function resolveSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  if (theme === "system") {
    const resolved = resolveSystemTheme();
    document.documentElement.setAttribute("data-theme", resolved);
    return;
  }
  document.documentElement.setAttribute("data-theme", theme);
}

export default function ThemeToggleClient({
  theme: initialTheme = "system" as Theme,
}: Props) {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    applyTheme(theme);

    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  const updateTheme = async (newTheme: Theme) => {
    const prevTheme = theme;

    setTheme(newTheme);
    applyTheme(newTheme);
    setIsSaving(true);

    try {
      const res = await fetch("/api/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: newTheme }),
      });

      if (!res.ok) {
        setTheme(prevTheme);
        applyTheme(prevTheme);
        console.error("Theme update failed:", await res.text());
      }
    } catch (error) {
      setTheme(prevTheme);
      applyTheme(prevTheme);
      console.error("Failed to update theme:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    updateTheme(value as Theme);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="theme" className={styles.label}>Theme</label>
      <select
        id="theme"
        className={styles.select}
        value={theme}
        onChange={handleChange}
        disabled={isSaving}
        aria-label="Select theme"
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
