import type { LexicalEditor } from "lexical"
import { $getSelection, $isRangeSelection } from "lexical"
import { $patchStyleText } from "@lexical/selection"

const applyTextStyles = (
  editor: LexicalEditor,
  styles: Record<string, string>,
) => {
  editor.update(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      $patchStyleText(selection, styles)
    }
  })
}

export { applyTextStyles }
