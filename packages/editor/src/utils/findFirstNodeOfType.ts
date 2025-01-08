import { ElementNode } from "lexical"

/**
 * Performs a depth-first search of a Lexical Parent Node's Child tree for the first occurrence of a node of type `targetType`
 */
const findFirstNodeOfType =
  (targetType: string) =>
  (node: LexicalNode): LexicalNode | null => {
    if (node.getType() === targetType) return node
    for (const child of node.getChildren()) {
      return findFirstNodeOfType(targetType)(child)
    }
    // eslint-disable-next-line unicorn/no-null
    return null
  }
