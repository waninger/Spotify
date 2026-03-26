import { NextResponse } from "next/server";
import { contentTreeNodeProvider } from "@/components/features/reqursive-render/providers/providerIndex";

export async function GET() {
    try {
    const tree = await contentTreeNodeProvider.fetchContentNodeTree();

    const response = NextResponse.json({
      success: true,
      data: tree,
    });
    response.headers.set("Cache-Control", "no-store");
    return response;
    } catch (error) {
        console.error("Error fetching content node tree:", error);

    const response = NextResponse.json(
      {
        success: false,
        error: "Failed to fetch content node tree.",
      },
      { status: 500 },
    );
    response.headers.set("Cache-Control", "no-store");
    return response;
    }
}
