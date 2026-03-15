import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { playlistRepository } from "@/repositories/playlistRepository";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { playlistId: string; songId: string } }
) {
  const session = await auth();
  const playlistId = (await params).playlistId;
  const songId = (await params).songId;
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log(`Removing song ${songId} from playlist ${playlistId} for user ${session.user.email}`);
  try {
    await playlistRepository.removeSongFromPlaylist(playlistId, songId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing song from playlist:", error);
    return NextResponse.json({ error: "Failed to remove song" }, { status: 500 });
  }
}