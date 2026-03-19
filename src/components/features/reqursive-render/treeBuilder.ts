import { ContentNode } from "./types";
export class TreeBuilder {
    tree: ContentNode;
    constructor(tree: ContentNode) {
        this.tree = tree;
        if (!this.tree) {
            this.tree = {
                type: "ROOT",
                id: "root",
                parameters: {},
                children: [],
            };
        } else if (this.tree.type !== "ROOT") {
            throw new Error("The root of the tree must be of type 'ROOT'.");
        };
    }

    addNode(parentId: string, newNode: ContentNode) {
        const parentNode = this.findNode(this.tree, parentId);
        if (parentNode) {
            parentNode.children.push(newNode);
        } else {
            console.warn(`Parent node with id ${parentId} not found.`);
        }
    }

    removeNode(nodeId: string) {
        if (this.tree.id === nodeId) {
            console.warn("Cannot remove the root node.");
            return;
        }
        this.removeNodeRecursive(this.tree, nodeId);
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

    findNode(node: ContentNode, id: string): ContentNode | null {
        if (node.id === id) {
            return node;
        }
        for (const child of node.children) {
            const found = this.findNode(child, id);
            if (found) {
                return found;
            }
        }
        return null;
    }

}