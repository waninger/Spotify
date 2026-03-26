import { ContentNode, NodeParameterValue } from "@/components/features/reqursive-render/types";

export interface ContentNodeTreeRepository {

    fetchContentNodeTree(): Promise<ContentNode>;
    createContentNodeTree(parentId: string, node: Omit<ContentNode, "id">): Promise<string>;
    updateContentNodeTree(nodeId: string, updatedParameters: Record<string, NodeParameterValue>): Promise<void>;
    deleteContentNodeTree(nodeId: string): Promise<void>;
}

export interface ContentNodeComponentRepository{

    getAllComponents(): Promise<ContentNode[] | null>;
    getComponentById(id: string): Promise<ContentNode | null>;
    deleteComponentById(id: string): Promise<void>;
    updateComponentById(id: string, updatedComponent: Omit<ContentNode, "id">): Promise<void>;
    createComponent(component: Omit<ContentNode, "id">): Promise<string>;
}