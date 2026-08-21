import { useEffect, useRef } from "react"
import { useAtomValue } from "jotai"
import { $getNodeByKey, CLICK_COMMAND, COMMAND_PRIORITY_LOW } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection"
import { Stack } from "@mui/material"
import { match } from "ts-pattern"
import { pipe } from "fp-ts/function"
import {
  filter as Ofilter,
  fromNullable as OfromNullable,
  match as Omatch,
} from "fp-ts/Option"
import { or } from "fp-ts/Predicate"
import {
  ResizableImage,
  isResizingAtom,
  imageAlignmentAtom,
} from "@dictybase/resizable-image"
import { $isImageNode, ALIGNMENT } from "./ImageNode"
import { targetIsImage } from "./imageSelectHandlers"

export type ImageComponentProperties = {
  src: string
  nodeKey: string
  alt?: string | undefined
  fit: string
  duration: number
  easing: string
}

const ImageComponent = ({
  src,
  alt,
  nodeKey,
  fit,
  easing,
  duration,
}: ImageComponentProperties) => {
  const imageReference = useRef<HTMLImageElement>(null)
  const [editor] = useLexicalComposerContext()
  const isResizing = useAtomValue(isResizingAtom)
  const alignment = useAtomValue(imageAlignmentAtom)
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey)

  const onResize = (width: number, height: number) => {
    editor.update(() => {
      pipe(
        nodeKey,
        $getNodeByKey,
        OfromNullable,
        Ofilter($isImageNode),
        Omatch(
          () => {},
          (imageNode) => {
            imageNode.setDimensions(width, height)
          },
        ),
      )
    })
  }

  const onSetAlignment = (alignment: ALIGNMENT) => {
    editor.update(() => {
      pipe(
        nodeKey,
        $getNodeByKey,
        OfromNullable,
        Ofilter($isImageNode),
        Omatch(
          () => {},
          (imageNode) => {
            imageNode.setAlignment(alignment)
          },
        ),
      )
    })
  }

  const targetIsImageReference = (target: EventTarget) =>
    target === imageReference.current

  useEffect(() => {
    const unregisterClickListener = editor.registerCommand(
      CLICK_COMMAND,
      (payload: MouseEvent) => {
        // isResizing check prevents the selection from being cleared after resizing the image
        // since returning true will prevent other CLICK_COMMAND listeners. There seems to
        // be another command listener registered that clears the editor selection.
        if (isResizing) return true

        const imageSelectCondition = pipe(
          targetIsImage,
          or(targetIsImageReference),
        )
        return pipe(
          payload.target,
          OfromNullable,
          Ofilter(imageSelectCondition),
          Omatch(
            () => false,
            () => {
              // If a different image is already selected, clearSelection() will remove it
              // from the editor selection.
              clearSelection()
              // Creates a NodeSelection and sets the current editor selection to the
              // node that matches the provided nodeKey argument
              setSelected(true)
              return true
            },
          ),
        )
      },
      COMMAND_PRIORITY_LOW,
    )

    return () => {
      unregisterClickListener()
    }
  })
  return (
    <Stack
      sx={{ width: "100%" }}
      flexDirection="row"
      justifyContent={match(alignment)
        .with(ALIGNMENT.LEFT, () => "start")
        .with(ALIGNMENT.CENTER, () => "center")
        .with(ALIGNMENT.RIGHT, () => "end")
        .otherwise(() => "left")}>
      <ResizableImage
        src={src}
        imageReference={imageReference}
        alt={alt}
        fit={fit}
        duration={duration}
        easing={easing}
        isSelected={isSelected}
        onResize={onResize}
        onSetAlignment={onSetAlignment}
      />
    </Stack>
  )
}

export { ImageComponent }
