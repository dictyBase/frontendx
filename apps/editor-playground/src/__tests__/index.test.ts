import { test, expect } from "vitest"
import { pipe } from "fp-ts/function"
import { findFirst as AfindFirst, head as Ahead, last as Alast } from "fp-ts/Array"
import {
  map as Omap,
  flatMap as OflatMap,
  fromNullable as OfromNullable,
  filter as Ofilter,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { $getRoot, $setSelection, $createNodeSelection, LexicalNode } from "lexical"
import { $isFlexLayoutNode } from "@dictybase/flex-layout-plugin"
import { createHeadlessEditor } from "@lexical/headless"
import { flexLayoutEditorConfig, flexLayoutStateString } from "@dictybase/editor"
import { onInsertImage } from "@dictybase/image-plugin"
import { twoParagraphsState } from "./testEditorStates"

const getFlexLayoutNode = () =>
  pipe($getRoot().getFirstChild(), OfromNullable, Ofilter($isFlexLayoutNode))

const editor = createHeadlessEditor({
  nodes: flexLayoutEditorConfig.nodes,
  onError: () => {},
})

test("onInsertImage appends an ImageNode to end of the FlexLayoutNode if there is no selection", () => {
  let flexLayoutNodeLastChildType = ""
  editor.setEditorState(editor.parseEditorState(flexLayoutStateString))
  editor.update(
    () => {
      onInsertImage({ source: "test.jpg" })
    },
    // Forces update to run synchronously
    { discrete: true },
  )
  editor.read(() => {
    flexLayoutNodeLastChildType = pipe(
      getFlexLayoutNode(),
      Omap((fln) => fln.getLastChild()),
      OflatMap(OfromNullable),
      Omap((node) => node.getType()),
      OgetOrElse(() => ""),
    )
  })
  expect(flexLayoutNodeLastChildType).toBe("image")
})

test("INSERT_IMAGE_COMMAND inserts an ImageNode after the currently selected node", () => {
  let flexLayoutChildren: Array<LexicalNode> = []
  let afterFirstParagraphKey = ""
  let beforeLastParagraphKey = ""
  // Set up state
  editor.setEditorState(editor.parseEditorState(JSON.stringify(twoParagraphsState)))

  editor.update(
    () => {
      // Set selection
      pipe(
        getFlexLayoutNode(),
        // Get first paragraph
        Omap((fln) => fln.getFirstChild()),
        OflatMap(OfromNullable),
        Omap((node) => node.getKey()),
        Omap((nodeKey) => {
          const selection = $createNodeSelection()
          selection.add(nodeKey)
          return selection
        }),
        Omap($setSelection),
      )
      // Insert Image
      onInsertImage({ source: "test.jpg" })
    },
    // Forces update to run synchronously
    { discrete: true },
  )

  editor.read(() => {
    flexLayoutChildren = pipe(
      getFlexLayoutNode(),
      Omap((fln) => fln.getChildren()),
      OgetOrElse(() => [] as Array<LexicalNode>),
    )
    afterFirstParagraphKey = pipe(
      flexLayoutChildren,
      Ahead,
      Omap((node) => node.getNextSibling()),
      OflatMap(OfromNullable),
      Omap((nextSibling) => nextSibling.getType()),
      OgetOrElse(() => "Failed to get key"),
    )
    beforeLastParagraphKey = pipe(
      flexLayoutChildren,
      Alast,
      Omap((node) => node.getPreviousSibling()),
      OflatMap(OfromNullable),
      Omap((nextSibling) => nextSibling.getType()),
      OgetOrElse(() => "Failed to get key"),
    )
  })

  expect(afterFirstParagraphKey).toBe("image")
  expect(beforeLastParagraphKey).toBe("image")
})
