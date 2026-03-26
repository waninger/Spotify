import type { ContentNode } from "@/components/features/reqursive-render/types";
import mockContentTree from "@/components/features/reqursive-render/mock-data/mock-content-tree.json";
import mockContentTreeDeep from "@/components/features/reqursive-render/mock-data/mock-content-tree-deep.json";
import mockContentTreeInvalidType from "@/components/features/reqursive-render/mock-data/mock-content-tree-invalid-type.json";

export const mockData: ContentNode[] = [
    mockContentTree as unknown as ContentNode,
    mockContentTreeDeep as unknown as ContentNode,
    mockContentTreeInvalidType as unknown as ContentNode,
];