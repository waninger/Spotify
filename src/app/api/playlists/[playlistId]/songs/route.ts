import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { playlistRepository } from "@/repositories/playlistRepository";

export async function POST(
  request: NextRequest,
  { params }: { params: { playlistId: string } }
) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const playlistId = (await params).playlistId ?? null;
  if(!playlistId) {
    return NextResponse.json({ error: "Playlist ID required" }, { status: 400 });
  }

  const { songId } = await request.json();
  if (!songId) {
    return NextResponse.json({ error: "songId required" }, { status: 400 });
  }

  try {
    await playlistRepository.addSongToPlaylist(playlistId, songId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding song to playlist:", error);
    return NextResponse.json({ error: "Failed to add song" }, { status: 500 });
  }
}