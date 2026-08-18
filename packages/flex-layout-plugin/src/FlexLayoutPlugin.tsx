import { useEffect } from "react"
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  COMMAND_PRIORITY_CRITICAL,
  INSERT_PARAGRAPH_COMMAND,
} from "lexical"
import { pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  map as Omap,
  filter as Ofilter,
  match as Omatch,
} from "fp-ts/Option"
import { $isFlexLayoutNode } from "./FlexLayoutNode"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

const insertParagraphIntoFlexLayout = () => {
  let shouldInsertBefore = false
  return pipe(
    $getSelection(),
    OfromNullable,
    Ofilter($isRangeSelection),
    Ofilter((selection) => selection.isCollapsed()),
    Omap(({ focus }) => {
      shouldInsertBefore = focus.offset === 0
      return focus.getNode()
    }),
    Ofilter($isFlexLayoutNode),
    Omatch(
      () => false,
      (flexLayoutNode) => {
        const paragraph = $createParagraphNode()
        if (shouldInsertBefore) {
          return pipe(
            flexLayoutNode.getFirstChild(),
            OfromNullable,
            Omatch(
              () => {
                return false
              },
              (firstChild) => {
                firstChild.insertBefore(paragraph, true)
                paragraph.select()
                return true
              },
            ),
          )
        } else {
          flexLayoutNode.append(paragraph)
          return true
        }
      },
    ),
  )
}

const FlexLayoutPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    // Before this handler
    const unregisterInsertParagraph = editor.registerCommand(
      INSERT_PARAGRAPH_COMMAND,
      insertParagraphIntoFlexLayout,
      COMMAND_PRIORITY_CRITICAL,
    )

    return () => {
      unregisterInsertParagraph()
    }
  })

  return <></>
}

export { FlexLayoutPlugin }
