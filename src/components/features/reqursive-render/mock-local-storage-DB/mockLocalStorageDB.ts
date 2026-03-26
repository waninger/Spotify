import type {
	ContentNodeComponentRepository,
	ContentNodeTreeRepository,
} from "@/components/features/reqursive-render/interfaces/interfaces";
import type { ContentNode, NodeParameterValue } from "@/components/features/reqursive-render/types";

type StorageLike = {
	getItem: (key: string) => string | null;
	setItem: (key: string, value: string) => void;
	removeItem: (key: string) => void;
};

const TREE_STORAGE_KEY = "reqursive-render:content-tree";
const COMPONENTS_STORAGE_KEY = "reqursive-render:component-library";

const memoryStorage = new Map<string, string>();

const memoryStorageAdapter: StorageLike = {
	getItem: (key) => memoryStorage.get(key) ?? null,
	setItem: (key, value) => {
		memoryStorage.set(key, value);
	},
	removeItem: (key) => {
		memoryStorage.delete(key);
	},
};

function getStorage(): StorageLike {
	if (typeof window !== "undefined" && window.localStorage) {
		return window.localStorage;
	}

	return memoryStorageAdapter;
}

function createDefaultTree(): ContentNode {
	return {
		type: "ROOT",
		id: "root",
		parameters: {},
		children: [],
	};
}

function deepClone<T>(value: T): T {
	if (typeof structuredClone === "function") {
		return structuredClone(value);
	}

	return JSON.parse(JSON.stringify(value)) as T;
}

function createId(prefix: string): string {
	if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
		return `${prefix}-${crypto.randomUUID()}`;
	}

	return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function findNodeById(node: ContentNode, id: string): ContentNode | null {
	if (node.id === id) {
		return node;
	}

	for (const child of node.children) {
		const found = findNodeById(child, id);
		if (found) {
			return found;
		}
	}

	return null;
}

function removeNodeById(root: ContentNode, id: string): boolean {
	const directChildIndex = root.children.findIndex((child) => child.id === id);
	if (directChildIndex >= 0) {
		root.children.splice(directChildIndex, 1);
		return true;
	}

	for (const child of root.children) {
		if (removeNodeById(child, id)) {
			return true;
		}
	}

	return false;
}

export class MockLocalStorageDB
	implements ContentNodeTreeRepository, ContentNodeComponentRepository
{
	private readTree(): ContentNode {
		const raw = getStorage().getItem(TREE_STORAGE_KEY);
		if (!raw) {
			return createDefaultTree();
		}

		try {
			return JSON.parse(raw) as ContentNode;
		} catch {
			return createDefaultTree();
		}
	}

	private writeTree(tree: ContentNode): void {
		getStorage().setItem(TREE_STORAGE_KEY, JSON.stringify(tree));
	}

	private readComponents(): ContentNode[] {
		const raw = getStorage().getItem(COMPONENTS_STORAGE_KEY);
		if (!raw) {
			return [];
		}

		try {
			return JSON.parse(raw) as ContentNode[];
		} catch {
			return [];
		}
	}

	private writeComponents(components: ContentNode[]): void {
		getStorage().setItem(COMPONENTS_STORAGE_KEY, JSON.stringify(components));
	}

	async fetchContentNodeTree(): Promise<ContentNode> {
		return deepClone(this.readTree());
	}

	async createContentNodeTree(parentId: string, node: Omit<ContentNode, "id">): Promise<string> {
		const tree = this.readTree();
		const parent = findNodeById(tree, parentId);

		if (!parent) {
			throw new Error(`Parent node '${parentId}' not found.`);
		}

		const newId = createId(node.type.toLowerCase());
		const newNode: ContentNode = {
			...deepClone(node),
			id: newId,
		};

		parent.children.push(newNode);
		this.writeTree(tree);
		return newId;
	}

	async updateContentNodeTree(
		nodeId: string,
		updatedParameters: Record<string, NodeParameterValue>,
	): Promise<void> {
		const tree = this.readTree();
		const node = findNodeById(tree, nodeId);

		if (!node) {
			throw new Error(`Node '${nodeId}' not found.`);
		}

		node.parameters = {
			...node.parameters,
			...deepClone(updatedParameters),
		};

		this.writeTree(tree);
	}

	async deleteContentNodeTree(nodeId: string): Promise<void> {
		if (nodeId === "root") {
			throw new Error("Cannot delete root node.");
		}

		const tree = this.readTree();
		const removed = removeNodeById(tree, nodeId);
		if (!removed) {
			throw new Error(`Node '${nodeId}' not found.`);
		}

		this.writeTree(tree);
	}

	async getAllComponents(): Promise<ContentNode[] | null> {
		return deepClone(this.readComponents());
	}

	async getComponentById(id: string): Promise<ContentNode | null> {
		const component = this.readComponents().find((item) => item.id === id);
		return component ? deepClone(component) : null;
	}

	async deleteComponentById(id: string): Promise<void> {
		const components = this.readComponents();
		const nextComponents = components.filter((component) => component.id !== id);
		this.writeComponents(nextComponents);
	}

	async updateComponentById(id: string, updatedComponent: Omit<ContentNode, "id">): Promise<void> {
		const components = this.readComponents();
		const targetIndex = components.findIndex((component) => component.id === id);

		if (targetIndex < 0) {
			throw new Error(`Component '${id}' not found.`);
		}

		components[targetIndex] = {
			...deepClone(updatedComponent),
			id,
		};

		this.writeComponents(components);
	}

	async createComponent(component: Omit<ContentNode, "id">): Promise<string> {
		const components = this.readComponents();
		const id = createId(component.type.toLowerCase());

		components.push({
			...deepClone(component),
			id,
		});

		this.writeComponents(components);
		return id;
	}

	clearAll(): void {
		getStorage().removeItem(TREE_STORAGE_KEY);
		getStorage().removeItem(COMPONENTS_STORAGE_KEY);
	}

	replaceTree(tree: ContentNode): void {
		this.writeTree(deepClone(tree));
	}

	seedTreeIfEmpty(tree: ContentNode): void {
		const currentTree = this.readTree();
		if (currentTree.children.length === 0) {
			this.writeTree(deepClone(tree));
		}
	}

	seedComponentsIfEmpty(components: Omit<ContentNode, "id">[]): void {
		const currentComponents = this.readComponents();
		if (currentComponents.length > 0) {
			return;
		}

		const seeded = components.map((component) => ({
			...deepClone(component),
			id: createId(component.type.toLowerCase()),
		}));

		this.writeComponents(seeded);
	}
}

export const mockLocalStorageDB = new MockLocalStorageDB();

export const mockLocalStorageTreeRepository: ContentNodeTreeRepository = mockLocalStorageDB;
export const mockLocalStorageComponentRepository: ContentNodeComponentRepository =
	mockLocalStorageDB;
