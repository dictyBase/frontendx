import { Option, none, some, isSome } from "fp-ts/Option"
import {
  LexicalNode,
  ParagraphNode,
  $isElementNode,
  $isParagraphNode,
} from "lexical"

const findFirstParagraphNode = (
  nodes: LexicalNode[],
): Option<ParagraphNode> => {
  // eslint-disable-next-line no-restricted-syntax
  for (const node of nodes) {
    // Check if current node is a paragraph.
    if ($isParagraphNode(node)) return some(node)

    // Element nodes have the `getChildren` method. If node has children, search recursively (depth-first).
    if ($isElementNode(node)) {
      const result = findFirstParagraphNode(node.getChildren())
      if (isSome(result)) return result
    }
  }

  return none
}
export { findFirstParagraphNode }
