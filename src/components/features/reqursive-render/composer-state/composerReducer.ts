import type { ContentNode } from "@/components/features/reqursive-render/types";
import { appendChildToNode, removeNodeFromTree } from "./composerUtils";

export type ComposerState = {
  tree: ContentNode;
  selectedNodeId: string;
};

export type ComposerAction =
  | { type: "select-node"; nodeId: string }
  | { type: "add-child"; parentId: string; node: ContentNode }
  | { type: "remove-node"; nodeId: string };

export function createInitialComposerState(tree: ContentNode): ComposerState {
  return {
    tree,
    selectedNodeId: tree.id,
  };
}

export function composerReducer(
  state: ComposerState,
  action: ComposerAction,
): ComposerState {
  switch (action.type) {
    case "select-node":
      return {
        ...state,
        selectedNodeId: action.nodeId,
      };

    case "add-child":
      return {
        tree: appendChildToNode(state.tree, action.parentId, action.node),
        selectedNodeId: action.node.id,
      };

    case "remove-node": {
      const nextTree = removeNodeFromTree(state.tree, action.nodeId);

      if (nextTree === state.tree) {
        return state;
      }

      return {
        tree: nextTree,
        selectedNodeId:
          state.selectedNodeId === action.nodeId ? nextTree.id : state.selectedNodeId,
      };
    }

    default:
      return state;
  }
}

