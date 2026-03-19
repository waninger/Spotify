"use client";

import { useState } from "react";
import { Theme } from "@/types/theme";
import {
  ALLOWED_THEME_TOKENS,
  DEFAULT_THEME_SETTINGS,
  ThemeSettings,
  ThemeTokenName,
} from "@/types/themeSettings";
import styles from "./themeSettingsForm.module.scss";

const TOKEN_LABELS: Record<ThemeTokenName, string> = {
  "--color-accent": "Accent",
  "--color-accent-hover": "Accent Hover",
  "--color-accent-active": "Accent Active",
  "--color-bg": "Background",
  "--color-text": "Text",
  "--color-card-background": "Card Background",
  "--color-border": "Border",
};

const THEME_MODES: Theme[] = ["system", "light", "dark"];

type Props = {
  initialSettings: ThemeSettings;
};

function resolveSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applySettingsPreview(settings: ThemeSettings) {
  const root = document.documentElement;

  const effectiveTheme =
    settings.mode === "system" ? resolveSystemTheme() : settings.mode;
  root.setAttribute("data-theme", effectiveTheme);

  const scaleUi = settings.scaleUi ?? DEFAULT_THEME_SETTINGS.scaleUi;
  const scaleText = settings.scaleText ?? DEFAULT_THEME_SETTINGS.scaleText;
  const scaleSpace = settings.scaleSpace ?? DEFAULT_THEME_SETTINGS.scaleSpace;

  root.style.setProperty("--scale-ui", String(scaleUi));
  root.style.setProperty("--scale-text", String(scaleText));
  root.style.setProperty("--scale-space", String(scaleSpace));

  for (const token of ALLOWED_THEME_TOKENS) {
    const value = settings.tokens[token];
    if (value) {
      root.style.setProperty(token, value);
    } else {
      root.style.removeProperty(token);
    }
  }
}

function normalizeHex(value: string): string {
  if (!value.startsWith("#")) return value;
  if (value.length === 4) {
    return (
      "#" + value[1] + value[1] + value[2] + value[2] + value[3] + value[3]
    );
  }
  return value;
}

export default function ThemeSettingsForm({ initialSettings }: Props) {
  const [settings, setSettings] = useState<ThemeSettings>({
    ...DEFAULT_THEME_SETTINGS,
    ...initialSettings,
    tokens: {
      ...DEFAULT_THEME_SETTINGS.tokens,
      ...initialSettings.tokens,
    },
  });
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<string>("");

  function updateMode(mode: Theme) {
    const next = { ...settings, mode };
    setSettings(next);
    applySettingsPreview(next);
  }

  function updateNumericScale(
    key: "scaleUi" | "scaleText" | "scaleSpace",
    value: number,
  ) {
    const rounded = Math.round(value * 100) / 100;
    const next = { ...settings, [key]: rounded } as ThemeSettings;
    setSettings(next);
    applySettingsPreview(next);
  }

  function updateToken(token: ThemeTokenName, value: string) {
    const normalized = normalizeHex(value);
    const next = {
      ...settings,
      tokens: {
        ...settings.tokens,
        [token]: normalized,
      },
    };
    setSettings(next);
    applySettingsPreview(next);
  }

  function resetSettings() {
    setSettings(DEFAULT_THEME_SETTINGS);
    applySettingsPreview(DEFAULT_THEME_SETTINGS);
    setStatus("Reset to defaults. Save to persist.");
  }

  async function saveSettings() {
    setIsSaving(true);
    setStatus("");

    try {
      const res = await fetch("/api/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          theme: settings.mode,
          settings,
        }),
      });

      if (!res.ok) {
        setStatus("Failed to save settings.");
        return;
      }

      setStatus("Theme settings saved.");
    } catch {
      setStatus("Failed to save settings.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className={styles.container}>
      <section className={styles.card}>
        <h2 className={styles.title}>Theme Mode</h2>
        <p className={styles.description}>
          Choose how the app should resolve light and dark styles.
        </p>

        <div className={styles.row}>
          <label htmlFor="theme-mode" className={styles.label}>
            Mode
          </label>
          <select
            id="theme-mode"
            value={settings.mode}
            onChange={(e) => updateMode(e.target.value as Theme)}
            className={styles.select}
          >
            {THEME_MODES.map((mode) => (
              <option key={mode} value={mode}>
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className={styles.card}>
        <h2 className={styles.title}>UI Scale</h2>
        <p className={styles.description}>
          Scale component heights using <code>--scale-ui</code>.
        </p>

        <div className={styles.row}>
          <label htmlFor="ui-scale" className={styles.label}>
            Scale
          </label>
          <input
            id="ui-scale"
            type="range"
            min={0.8}
            max={1.4}
            step={0.01}
            value={settings.scaleUi}
            className={styles.range}
            onChange={(e) => updateNumericScale("scaleUi", Number(e.target.value))}
          />
          <span className={styles.value}>{settings.scaleUi.toFixed(2)}x</span>
        </div>
      </section>

      <section className={styles.card}>
        <h2 className={styles.title}>Text Scale</h2>
        <p className={styles.description}>
          Scale typography tokens using <code>--scale-text</code>.
        </p>

        <div className={styles.row}>
          <label htmlFor="text-scale" className={styles.label}>
            Scale
          </label>
          <input
            id="text-scale"
            type="range"
            min={0.8}
            max={1.4}
            step={0.01}
            value={settings.scaleText ?? DEFAULT_THEME_SETTINGS.scaleText}
            className={styles.range}
            onChange={(e) => updateNumericScale("scaleText", Number(e.target.value))}
          />
          <span className={styles.value}>
            {(settings.scaleText ?? DEFAULT_THEME_SETTINGS.scaleText).toFixed(
              2,
            )}
            x
          </span>
        </div>
      </section>

      <section className={styles.card}>
        <h2 className={styles.title}>Space Scale</h2>
        <p className={styles.description}>
          Scale spacing tokens using <code>--scale-space</code>.
        </p>

        <div className={styles.row}>
          <label htmlFor="space-scale" className={styles.label}>
            Scale
          </label>
          <input
            id="space-scale"
            type="range"
            min={0.8}
            max={1.4}
            step={0.01}
            value={settings.scaleSpace ?? DEFAULT_THEME_SETTINGS.scaleSpace}
            className={styles.range}
            onChange={(e) => updateNumericScale("scaleSpace", Number(e.target.value))}
          />
          <span className={styles.value}>
            {(settings.scaleSpace ?? DEFAULT_THEME_SETTINGS.scaleSpace).toFixed(
              2,
            )}
            x
          </span>
        </div>
      </section>

      <section className={styles.card}>
        <h2 className={styles.title}>Custom Tokens</h2>
        <p className={styles.description}>
          Override selected CSS variables and build your own theme palette.
        </p>

        <div className={styles.tokenGrid}>
          {ALLOWED_THEME_TOKENS.map((token) => (
            <div key={token} className={styles.tokenRow}>
              <label htmlFor={token} className={styles.label}>
                {TOKEN_LABELS[token]}
              </label>
              <input
                id={token}
                type="color"
                value={settings.tokens[token] ?? "#1db954"}
                className={styles.color}
                onChange={(e) => updateToken(token, e.target.value)}
              />
              <input
                type="text"
                value={settings.tokens[token] ?? "#1db954"}
                onChange={(e) => updateToken(token, e.target.value)}
                className={styles.text}
                spellCheck={false}
              />
            </div>
          ))}
        </div>
      </section>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={resetSettings}
          className={styles.secondaryButton}
          disabled={isSaving}
        >
          Reset
        </button>
        <button
          type="button"
          onClick={saveSettings}
          className={styles.primaryButton}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {status && <p className={styles.status}>{status}</p>}
    </div>
  );
}
