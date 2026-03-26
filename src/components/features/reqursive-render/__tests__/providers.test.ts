import { describe, expect, it } from "vitest";

import { mockComponentRepository, mockTreeRepository } from "../providers/providers";

describe("mockTreeRepository", () => {
    it("returns a normalized content tree from the mock json", async () => {
        const tree = await mockTreeRepository.fetchContentNodeTree();

        expect(tree.type).toBe("ROOT");
        expect(tree.children).toHaveLength(3);
        expect(tree.children.map((child) => child.type)).toEqual(["IMAGE", "CALLOUT", "LINK_CARD"]);
        expect(tree.children[0]?.children).toHaveLength(1);
        expect(tree.children[0]?.children[0]?.type).toBe("IMAGE");
    });

    it("returns a detached clone on each fetch", async () => {
        const firstTree = await mockTreeRepository.fetchContentNodeTree();
        firstTree.children[0]!.parameters.alt = "changed in test";
        firstTree.children.push({
            type: "CALLOUT",
            id: "test-node",
            parameters: { title: "Injected", text: "Should not persist" },
            children: [],
        });

        const secondTree = await mockTreeRepository.fetchContentNodeTree();

        expect(secondTree.children).toHaveLength(3);
        expect(secondTree.children[0]?.parameters.alt).toBe(
            "Abstract illustration used as recursive render demo artwork.",
        );
    });
});

describe("mockComponentRepository", () => {
    it("returns normalized components from the mock json files", async () => {
        const components = await mockComponentRepository.getAllComponents();

        expect(components).not.toBeNull();
        expect(components).toHaveLength(3);
        expect(components?.map((component) => component.type)).toEqual(["IMAGE", "LINK_CARD", "CALLOUT"]);
        expect(components?.every((component) => Array.isArray(component.children))).toBe(true);
    });

    it("returns a detached component clone by id", async () => {
        const components = await mockComponentRepository.getAllComponents();
        const componentId = components?.[0]?.id;

        expect(componentId).toBeTruthy();

        const firstComponent = await mockComponentRepository.getComponentById(componentId!);
        expect(firstComponent).not.toBeNull();

        firstComponent!.parameters.alt = "changed in test";

        const secondComponent = await mockComponentRepository.getComponentById(componentId!);

        expect(secondComponent?.parameters.alt).toBe("Interface preview used in release notes.");
    });

    it("returns null when a mock component id does not exist", async () => {
        await expect(mockComponentRepository.getComponentById("missing-component-id")).resolves.toBeNull();
    });
});