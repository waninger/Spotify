import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { playlistRepository } from "@/repositories/playlistRepository";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const playlists = await playlistRepository.getAll(session.user.email);
    return NextResponse.json(playlists);
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return NextResponse.json({ error: "Failed to fetch playlists" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await request.json();
  if (!name) {
    return NextResponse.json({ error: "Name required" }, { status: 400 });
  }

  try {
    const newPlaylist = await playlistRepository.createPlaylist(session.user.email, name);
    return NextResponse.json(newPlaylist);
  } catch (error) {
    console.error("Error creating playlist:", error);
    return NextResponse.json({ error: "Failed to create playlist" }, { status: 500 });
  }
}