import { NextRequest, NextResponse } from "next/server";
import {
  normalizeThemeSettings,
  parseThemeSettingsCookie,
  serializeThemeSettingsCookie,
} from "@/utils/themeSettings";
import { ThemeApiPayload } from "@/types/themeSettings";

export async function POST(req: NextRequest) {
  let body: ThemeApiPayload;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "invalid json" + error, code: 400 });
  }
  const { theme } = body;
  if (!["light", "dark", "system"].includes(theme)) {
    return NextResponse.json({ error: "invalid theme", code: 400 });
  }

  const previousSettings = parseThemeSettingsCookie(
    req.cookies.get("theme-settings")?.value,
  );
  const mergedSettings = normalizeThemeSettings({
    ...previousSettings,
    ...body.settings,
    mode: theme,
  });

  const response = NextResponse.json({ success: true });

  response.cookies.set("theme", theme, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: "strict",
    httpOnly: true,
    secure: true,
  });

  response.cookies.set("theme-settings", serializeThemeSettingsCookie(mergedSettings), {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "strict",
    httpOnly: true,
    secure: true,
  });

  return response;
}

export async function GET(req: NextRequest) {
  const settings = parseThemeSettingsCookie(req.cookies.get("theme-settings")?.value);
  return NextResponse.json({ settings });
}
