import { test, expect } from "vitest"
import { isSome, isNone, type Some } from "fp-ts/Option"
import { createHeadlessEditor } from "@lexical/headless"
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  LexicalNode,
  ParagraphNode,
  TextNode,
} from "lexical"
import { findFirstParagraphNode } from "../components/helpers/findFirstParagraphNode"

const createEditor = () =>
  createHeadlessEditor({
    namespace: "test",
    nodes: [ParagraphNode, TextNode],
    onError: (error: Error) => {
      throw error
    },
  })

test("returns none for empty array", () => {
  const result = findFirstParagraphNode([])
  expect(isNone(result)).toBe(true)
})

test("returns some when paragraph is first node", () => {
  const editor = createEditor()
  editor.update(() => {
    const paragraphNode = $createParagraphNode()
    const textNode = $createTextNode("test")
    const root = $getRoot()

    paragraphNode.append(textNode)
    root.append(paragraphNode)

    const nodes: LexicalNode[] = root.getChildren()
    const result = findFirstParagraphNode(nodes)
    expect(isSome(result)).toBe(true)
    expect((result as Some<ParagraphNode>).value).toBe(paragraphNode)
  })
})

test("returns some when paragraph is nested in element node", () => {
  const editor = createEditor()
  editor.update(() => {
    const rootParagraph = $createParagraphNode()
    const nestedParagraph = $createParagraphNode()
    const textNode = $createTextNode("nested text")

    nestedParagraph.append(textNode)
    rootParagraph.append(nestedParagraph)
    $getRoot().append(rootParagraph)

    const result = findFirstParagraphNode([rootParagraph])
    expect(isSome(result)).toBe(true)
    expect((result as Some<ParagraphNode>).value).toBe(rootParagraph)
  })
})

test("returns first paragraph when multiple exist", () => {
  const editor = createEditor()
  editor.update(() => {
    const firstParagraph = $createParagraphNode()
    const secondParagraph = $createParagraphNode()
    const root = $getRoot()
    root.append(firstParagraph, secondParagraph)

    const nodes: LexicalNode[] = root.getChildren()
    const result = findFirstParagraphNode(nodes)
    expect(isSome(result)).toBe(true)
    expect((result as Some<ParagraphNode>).value).toBe(firstParagraph)
  })
})

test("returns none when no paragraph nodes exist", () => {
  const editor = createEditor()
  editor.update(() => {
    const textNode = $createTextNode("just text")
    const nodes: LexicalNode[] = [textNode]

    const result = findFirstParagraphNode(nodes)
    expect(isNone(result)).toBe(true)
  })
})

test("searches depth-first for nested paragraph", () => {
  const editor = createEditor()
  editor.update(() => {
    const outerParagraph = $createParagraphNode()
    const innerParagraph = $createParagraphNode()
    const deepParagraph = $createParagraphNode()

    innerParagraph.append(deepParagraph)
    outerParagraph.append(innerParagraph)
    $getRoot().append(outerParagraph)

    const result = findFirstParagraphNode([outerParagraph])
    expect(isSome(result)).toBe(true)
    expect((result as Some<ParagraphNode>).value).toBe(outerParagraph)
  })
})
