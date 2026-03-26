import { describe, it, expect } from "vitest";
import { normalizeContentTree } from "../normalizeContentTree";
import type { ContentNode } from "../types";

/* ============================================================================
   Reusable Test Fixtures
   ============================================================================ */

const HEADING_NODE: ContentNode = {
  type: "HEADING",
  id: "h1",
  parameters: { text: "Title" },
  children: [],
};

const PARAGRAPH_NODE: ContentNode = {
  type: "PARAGRAPH",
  id: "p1",
  parameters: { text: "Body" },
  children: [],
};

const LIST_ITEM_FIRST: ContentNode = {
  type: "LIST_ITEM",
  id: "li1",
  parameters: { text: "First" },
  children: [],
};

const LIST_ITEM_SECOND: ContentNode = {
  type: "LIST_ITEM",
  id: "li2",
  parameters: { text: "Second" },
  children: [],
};

const LIST_NODE_WITH_ITEMS: ContentNode = {
  type: "LIST",
  id: "list",
  parameters: { title: "Items" },
  children: [LIST_ITEM_FIRST, LIST_ITEM_SECOND],
};

/* ============================================================================
   Tests
   ============================================================================ */

describe("normalizeContentTree", () => {
  describe("valid input", () => {
    it("should parse a simple root node", () => {
      const input: ContentNode = { type: "ROOT", id: "root", parameters: {}, children: [] };
      const result = normalizeContentTree(input);
      expect(result).toEqual(input);
    });

    it("should parse a tree with children", () => {
      const input: ContentNode = {
        type: "ROOT",
        id: "root",
        parameters: {},
        children: [HEADING_NODE, PARAGRAPH_NODE],
      };
      const result = normalizeContentTree(input);
      expect(result).toEqual(input);
    });

    it("should parse nested children recursively", () => {
      const input: ContentNode = {
        type: "ROOT",
        id: "root",
        parameters: {},
        children: [LIST_NODE_WITH_ITEMS],
      };
      const result = normalizeContentTree(input);
      expect(result).toEqual(input);
    });

    it("should handle default empty parameters", () => {
      const input = { type: "HEADING", id: "h1", parameters: undefined, children: [] };
      const result = normalizeContentTree(input);
      expect(result?.parameters).toEqual({});
    });

    it("should preserve complex parameter values", () => {
      const input: ContentNode = {
        type: "CALLOUT",
        id: "c1",
        parameters: { title: "Note", text: "Body", count: 42, flag: true, tags: ["a", "b"] },
        children: [],
      };
      const result = normalizeContentTree(input);
      expect(result?.parameters).toEqual(input.parameters);
    });
  });

  describe("unknown types", () => {
    it("should silently discard unknown node types (return null)", () => {
      const input = { type: "QUOTE", id: "q1", parameters: {}, children: [] };
      const result = normalizeContentTree(input);
      expect(result).toBeNull();
    });

    it("should filter out unknown children in a mixed tree", () => {
      const input: ContentNode = {
        type: "ROOT",
        id: "root",
        parameters: {},
        children: [
          HEADING_NODE,
          { type: "UNKNOWN_TYPE", id: "u1", parameters: {}, children: [] },
          PARAGRAPH_NODE,
        ],
      };
      const result = normalizeContentTree(input);
      expect(result?.children).toHaveLength(2);
      expect(result?.children?.[0].type).toBe("HEADING");
      expect(result?.children?.[1].type).toBe("PARAGRAPH");
    });

    it("should discard entire subtree of unknown nodes", () => {
      const input: ContentNode = {
        type: "ROOT",
        id: "root",
        parameters: {},
        children: [
          {
            type: "UNKNOWN",
            id: "u1",
            parameters: {},
            children: [
              { type: "HEADING", id: "h1", parameters: { text: "Buried" }, children: [] },
            ],
          },
        ],
      };
      const result = normalizeContentTree(input);
      expect(result?.children).toHaveLength(0);
    });
  });

  describe("invalid input", () => {
    it("should throw on non-object input", () => {
      expect(() => normalizeContentTree("not an object")).toThrow("expected object");
    });

    it("should throw on missing id", () => {
      expect(() => normalizeContentTree({ type: "HEADING", parameters: {}, children: [] })).toThrow(
        "expected non-empty string",
      );
    });

    it("should throw on empty id", () => {
      expect(() => normalizeContentTree({ type: "HEADING", id: "", parameters: {}, children: [] })).toThrow(
        "expected non-empty string",
      );
    });

    it("should throw on missing children array", () => {
      expect(() => normalizeContentTree({ type: "HEADING", id: "h1", parameters: {} })).toThrow(
        "expected array",
      );
    });

    it("should throw on invalid parameter type", () => {
      expect(() =>
        normalizeContentTree({
          type: "HEADING",
          id: "h1",
          parameters: { text: Symbol("bad") },
          children: [],
        }),
      ).toThrow("unsupported value type");
    });
  });

  describe("real world examples", () => {
    it("should parse complex demo tree", () => {
      const input: ContentNode = {
        type: "ROOT",
        id: "root",
        parameters: {},
        children: [
          {
            type: "HEADING",
            id: "title",
            parameters: { text: "Welcome" },
            children: [],
          },
          {
            type: "IMAGE",
            id: "img1",
            parameters: {
              url: "https://example.com/image.jpg",
              alt: "Demo image",
              caption: "A sample image",
            },
            children: [],
          },
          {
            type: "CALLOUT",
            id: "note",
            parameters: { title: "Important", text: "Pay attention" },
            children: [
              {
                type: "PARAGRAPH",
                id: "note-detail",
                parameters: { text: "More details here." },
                children: [],
              },
            ],
          },
        ],
      };
      const result = normalizeContentTree(input);
      expect(result).not.toBeNull();
      expect(result?.children).toHaveLength(3);
      expect(result?.children?.[1].type).toBe("IMAGE");
    });
  });
});
