import { RangeSelection, TextNode } from "lexical"

/**
 * This function is a $ (dollar) function. It is a convention of lexical which indicates that the function
 * must be called in an editor update context, e.g. in the editor.update() callback or command handler.
 */
const $capitalizeSelection = (selection: RangeSelection) => {
  // Apply capitalization to each selected node
  selection.getNodes().forEach((node) => {
    if (node instanceof TextNode) {
      // Get the text portions that are within the selection
      const textContent = node.getTextContent()
      const capitalized = textContent.toUpperCase()

      // Replace the text with capitalized version
      node.setTextContent(capitalized)
    }
  })
}

export { $capitalizeSelection }
