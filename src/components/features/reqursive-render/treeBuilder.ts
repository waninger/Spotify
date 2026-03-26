import type { ContentNode } from "./types";

function createRootNode(): ContentNode {
    return {
        type: "ROOT",
        id: TreeBuilder.createUuid(),
        parameters: {},
        children: [],
    };
}

export class TreeBuilder {
    private tree: ContentNode;

    static createUuid(): string {
        if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
            return crypto.randomUUID();
        }
        return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    }

    constructor(tree?: ContentNode) {
        this.tree = tree ?? createRootNode();
        if (this.tree.type !== "ROOT") {
            throw new Error("The root of the tree must be of type 'ROOT'.");
        }
    }

    createNodeId(): string {
        return TreeBuilder.createUuid();
    }

    insertNode(parentId: string, newNode: ContentNode): boolean {
        const parentNode = this.findNode(parentId);
        if (parentNode) {
            parentNode.children.unshift(newNode);
            return true;
        }
        console.warn(`Parent node with id ${parentId} not found.`);
        return false;
    }

    addNode(parentId: string, newNode: ContentNode): boolean {
        const parentNode = this.findNode(parentId);
        if (parentNode) {
            parentNode.children.push(newNode);
            return true;
        }
        console.warn(`Parent node with id ${parentId} not found.`);
        return false;
    }

    removeNode(nodeId: string): boolean {
        if (this.tree.id === nodeId) {
            console.warn("Cannot remove the root node.");
            return false;
        }
        return this.removeNodeRecursive(this.tree, nodeId);
    }

    private removeNodeRecursive(node: ContentNode, nodeId: string): boolean {
        const index = node.children.findIndex((child) => child.id === nodeId);
        if (index !== -1) {
            node.children.splice(index, 1);
            return true;
        }
        for (const child of node.children) {
            if (this.removeNodeRecursive(child, nodeId)) {
                return true;
            }
        }
        return false;
    }

    findNode(nodeId: string): ContentNode | null {
        return this.findNodeRecursive(this.tree, nodeId);
    }

    private findNodeRecursive(node: ContentNode, nodeId: string): ContentNode | null {
        if (node.id === nodeId) {
            return node;
        }
        for (const child of node.children) {
            const found = this.findNodeRecursive(child, nodeId);
            if (found) {
                return found;
            }
        }
        return null;
    }

    getTree(): ContentNode {
        return this.tree;
    }
}