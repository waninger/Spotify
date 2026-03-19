import mockContentTreeJson from "@/components/features/reqursive-render/mock-content-tree.json";
import mockContentTreeDeepJson from "@/components/features/reqursive-render/mock-content-tree-deep.json";
import mockContentTreeInvalidTypeJson from "@/components/features/reqursive-render/mock-content-tree-invalid-type.json";

export type MockTreeResponse = {
  name: string;
  payload: unknown;
};

/**
 * Simulates an API response containing unknown JSON payloads.
 */
export async function getMockContentTreeResponses(): Promise<MockTreeResponse[]> {
  return [
    { name: "basic", payload: mockContentTreeJson },
    { name: "deep", payload: mockContentTreeDeepJson },
    { name: "invalid-type", payload: mockContentTreeInvalidTypeJson },
  ];
}
