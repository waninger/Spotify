import mockContentTreeJson from "@/components/features/reqursive-render/mock-data/mock-content-tree.json";
import mockContentTreeDeepJson from "@/components/features/reqursive-render/mock-data/mock-content-tree-deep.json";
import mockContentTreeInvalidTypeJson from "@/components/features/reqursive-render/mock-data/mock-content-tree-invalid-type.json";
import mockImageJson from "@/components/features/reqursive-render/mock-data/mock-image-release-preview.json";
import mockLinkCardJson from "@/components/features/reqursive-render/mock-data/mock-link-card-phase-2-runbook.json";
import mockCalloutJson from "@/components/features/reqursive-render/mock-data/mock-callout-phase-2-callout.json";


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

export type MockComponentResponse = {
  name: string;
  payload: unknown;
};

/**
 * Simulates an API response containing unknown JSON payloads.
 */
export async function getMockComponentResponses(): Promise<MockComponentResponse[]> {
  return [
    { name: "image", payload: mockImageJson },
    { name: "link-card", payload: mockLinkCardJson },
    { name: "callout", payload: mockCalloutJson },
  ];
}

