import { test, expect } from "vitest"
import { isSome, isNone } from "fp-ts/Option"
import { $createParagraphNode, $createTextNode, LexicalNode } from "lexical"
import { findFirstParagraphNode } from "../components/helpers/findFirstParagraphNode"

test("returns none for empty array", () => {
  const result = findFirstParagraphNode([])
  expect(isNone(result)).toBe(true)
})

test("returns some when paragraph is first node", () => {
  const paragraphNode = $createParagraphNode()
  const textNode = $createTextNode("test")
  const nodes: LexicalNode[] = [paragraphNode, textNode]

  const result = findFirstParagraphNode(nodes)
  expect(isSome(result)).toBe(true)
  if (isSome(result)) {
    expect(result.value).toBe(paragraphNode)
  }
})

test("returns some when paragraph is nested in element node", () => {
  const rootParagraph = $createParagraphNode()
  const nestedParagraph = $createParagraphNode()
  const textNode = $createTextNode("nested text")

  nestedParagraph.append(textNode)
  rootParagraph.append(nestedParagraph)

  const result = findFirstParagraphNode([rootParagraph])
  expect(isSome(result)).toBe(true)
  if (isSome(result)) {
    expect(result.value).toBe(rootParagraph)
  }
})

test("returns first paragraph when multiple exist", () => {
  const firstParagraph = $createParagraphNode()
  const secondParagraph = $createParagraphNode()
  const nodes: LexicalNode[] = [firstParagraph, secondParagraph]

  const result = findFirstParagraphNode(nodes)
  expect(isSome(result)).toBe(true)
  if (isSome(result)) {
    expect(result.value).toBe(firstParagraph)
  }
})

test("returns none when no paragraph nodes exist", () => {
  const textNode = $createTextNode("just text")
  const nodes: LexicalNode[] = [textNode]

  const result = findFirstParagraphNode(nodes)
  expect(isNone(result)).toBe(true)
})

test("searches depth-first for nested paragraph", () => {
  const outerParagraph = $createParagraphNode()
  const innerParagraph = $createParagraphNode()
  const deepParagraph = $createParagraphNode()

  innerParagraph.append(deepParagraph)
  outerParagraph.append(innerParagraph)

  const result = findFirstParagraphNode([outerParagraph])
  expect(isSome(result)).toBe(true)
  if (isSome(result)) {
    expect(result.value).toBe(outerParagraph)
  }
})
