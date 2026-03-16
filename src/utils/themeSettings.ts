import {
  ALLOWED_THEME_TOKENS,
  DEFAULT_THEME_SETTINGS,
  ThemeSettings,
  ThemeTokenName,
  ThemeTokenOverrides,
} from "@/types/themeSettings";
import { Theme } from "@/types/theme";

const MIN_SCALE = 0.8;
const MAX_SCALE = 1.4;

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark" || value === "system";
}

function clampScale(value: unknown): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return DEFAULT_THEME_SETTINGS.scaleUi;
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, parsed));
}

function isSafeColorValue(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  // Keep this strict to avoid injecting arbitrary CSS through custom props.
  return /^#[0-9a-fA-F]{3,8}$/.test(trimmed);
}

function sanitizeTokens(value: unknown): ThemeTokenOverrides {
  if (!value || typeof value !== "object") return {};

  const tokens = value as Record<string, unknown>;
  const next: ThemeTokenOverrides = {};

  for (const token of ALLOWED_THEME_TOKENS) {
    const tokenValue = tokens[token];
    if (isSafeColorValue(tokenValue)) {
      next[token] = tokenValue;
    }
  }

  return next;
}

export function normalizeThemeSettings(value: unknown): ThemeSettings {
  const raw = value as Partial<ThemeSettings> | null | undefined;

  const mode = isTheme(raw?.mode) ? raw.mode : DEFAULT_THEME_SETTINGS.mode;
  const scaleUi = clampScale(raw?.scaleUi);
  const scaleText = clampScale(raw?.scaleText);
  const scaleSpace = clampScale(raw?.scaleSpace);
  const tokens = sanitizeTokens(raw?.tokens);

  return { mode, scaleUi, scaleText, scaleSpace, tokens };
}

export function parseThemeSettingsCookie(cookieValue?: string): ThemeSettings {
  if (!cookieValue) return DEFAULT_THEME_SETTINGS;

  try {
    const parsed = JSON.parse(cookieValue);
    return normalizeThemeSettings(parsed);
  } catch {
    return DEFAULT_THEME_SETTINGS;
  }
}

export function serializeThemeSettingsCookie(settings: ThemeSettings): string {
  return JSON.stringify(normalizeThemeSettings(settings));
}

export function toThemeCssVariables(settings: ThemeSettings): Record<string, string> {
  const vars: Record<string, string> = {
    "--scale-ui": settings.scaleUi.toString(),
    "--scale-text": settings.scaleText.toString(),
    "--scale-space": settings.scaleSpace.toString(),
  };

  for (const token of ALLOWED_THEME_TOKENS as readonly ThemeTokenName[]) {
    const tokenValue = settings.tokens[token];
    if (tokenValue) {
      vars[token] = tokenValue;
    }
  }

  return vars;
}
