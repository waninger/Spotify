import { Theme } from "./theme";

export const ALLOWED_THEME_TOKENS = [
  "--color-accent",
  "--color-accent-hover",
  "--color-accent-active",
  "--color-bg",
  "--color-text",
  "--color-card-background",
  "--color-border",
] as const;

export type ThemeTokenName = (typeof ALLOWED_THEME_TOKENS)[number];

export type ThemeTokenOverrides = Partial<Record<ThemeTokenName, string>>;

export type ThemeSettings = {
  mode: Theme;
  scaleUi: number;
  scaleText: number;
  scaleSpace: number;
  tokens: ThemeTokenOverrides;
};

export const DEFAULT_THEME_SETTINGS: ThemeSettings = {
  mode: "system",
  scaleUi: 1,
  scaleText: 1,
  scaleSpace: 1,
  tokens: {},
};

export type ThemeApiPayload = {
  theme: Theme;
  settings?: Partial<ThemeSettings>;
};
