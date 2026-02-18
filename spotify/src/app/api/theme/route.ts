import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "invalid json" + error, code: 400 });
  }
  const { theme } = body;
  if (!["light", "dark", "system"].includes(theme)) {
    return NextResponse.json({ error: "invalid theme", code: 400 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("theme", theme, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: "lax",
    httpOnly: false,
  });

  return response;
}
