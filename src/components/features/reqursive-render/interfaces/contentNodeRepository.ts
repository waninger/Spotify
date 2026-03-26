import {
  mockLocalStorageComponentRepository,
  mockLocalStorageDB,
  mockLocalStorageTreeRepository,
} from "@/components/features/reqursive-render/mock-local-storage-DB/mockLocalStorageDB";
import type { ContentNode } from "@/components/features/reqursive-render/types";

export const treeReposityory = mockLocalStorageTreeRepository;
export const componentRepository = mockLocalStorageComponentRepository;

export function saveTreeSnapshot(tree: ContentNode): void {
  mockLocalStorageDB.replaceTree(tree);
}

export function seedMockTreeIfEmpty(tree: ContentNode): void {
  mockLocalStorageDB.seedTreeIfEmpty(tree);
}

export function seedMockComponentsIfEmpty(components: Omit<ContentNode, "id">[]): void {
  mockLocalStorageDB.seedComponentsIfEmpty(components);
}