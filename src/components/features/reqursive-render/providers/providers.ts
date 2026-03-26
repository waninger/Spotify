import type { ContentNode } from "../types";
import type {
    ContentNodeComponentRepository,
    ContentNodeTreeRepository,
} from "../interfaces/interfaces";
import { normalizeContentTree } from "../normalizeContentTree";
import mockContentTreeJson from "../mock-data/mock-content-tree.json";
import mockImageJson from "../mock-data/mock-image-release-preview.json";
import mockLinkCardJson from "../mock-data/mock-link-card-phase-2-runbook.json";
import mockCalloutJson from "../mock-data/mock-callout-phase-2-callout.json";

function normalizeMockNode(rawNode: unknown, sourceName: string): ContentNode {
    const treeNode = normalizeContentTree(rawNode);
    if (!treeNode) {
        throw new Error(`Failed to normalize mock content from '${sourceName}'.`);
    }

    return treeNode;
}

const mockComponents: ContentNode[] = [
    normalizeMockNode(mockImageJson, "mock-image-release-preview.json"),
    normalizeMockNode(mockLinkCardJson, "mock-link-card-phase-2-runbook.json"),
    normalizeMockNode(mockCalloutJson, "mock-callout-phase-2-callout.json"),
];

function cloneNode<T>(value: T): T {
    return structuredClone(value);
}

function unsupportedMockMutation(methodName: string): never {
    throw new Error(`${methodName} is not implemented for the mock provider.`);
}

const mockTreeRepository: ContentNodeTreeRepository = {
    fetchContentNodeTree: async () => {
        console.log("Fetching content node tree from mock provider...");
        return cloneNode(normalizeMockNode(mockContentTreeJson, "mock-content-tree.json"));
    },
    createContentNodeTree: async (_parentId, _node) => {
        void _parentId;
        void _node;
        return unsupportedMockMutation("createContentNodeTree");
    },
    updateContentNodeTree: async (_nodeId, _updatedParameters) => {
        void _nodeId;
        void _updatedParameters;
        unsupportedMockMutation("updateContentNodeTree");
    },
    deleteContentNodeTree: async (_nodeId) => {
        void _nodeId;
        unsupportedMockMutation("deleteContentNodeTree");
    },
};

const mockComponentRepository: ContentNodeComponentRepository = {
    getAllComponents: async () => {
        return cloneNode(mockComponents);
    },
    getComponentById: async (id) => {
        const component = mockComponents.find((entry) => entry.id === id);
        return component ? cloneNode(component) : null;
    },
    deleteComponentById: async (_id) => {
        void _id;
        unsupportedMockMutation("deleteComponentById");
    },
    updateComponentById: async (_id, _updatedComponent) => {
        void _id;
        void _updatedComponent;
        unsupportedMockMutation("updateComponentById");
    },
    createComponent: async (_component) => {
        void _component;
        return unsupportedMockMutation("createComponent");
    },
};

export { mockTreeRepository, mockComponentRepository };