import { useEffect, useRef } from "react"
import { useAtomValue } from "jotai"
import {
  LexicalNode,
  $getNodeByKey,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
} from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection"
import { Stack } from "@mui/material"
import { match } from "ts-pattern"
import { pipe, flow } from "fp-ts/function"
import {
  filter as Ofilter,
  fromNullable as OfromNullable,
  match as Omatch,
  map as Omap,
} from "fp-ts/Option"
import { or } from "fp-ts/Predicate"
import {
  ResizableImage,
  isResizingAtom,
  imageAlignmentAtom,
  ALIGNMENT,
} from "@dictybase/resizable-image"

interface ImageNode extends LexicalNode {
  setDimensions: (height: number, width: number) => void
  setAlignment: (alignment: ALIGNMENT) => void
}

const $isImageNode = (node: LexicalNode): node is ImageNode =>
  node.getType() === "image"

export type ImageComponentProperties = {
  src: string
  nodeKey: string
  alt?: string | undefined
  fit: string
  duration: number
  easing: string
}

const getImageNodeByKey = flow(
  $getNodeByKey,
  OfromNullable,
  Ofilter($isImageNode),
)

const setImageNodeDimensions = (
  nodeKey: string,
  width: number,
  height: number,
) => {
  pipe(
    nodeKey,
    getImageNodeByKey,
    Omap((imageNode) => {
      imageNode.setDimensions(width, height)
    }),
  )
}

const setImageNodeAlignment = (nodeKey: string, alignment: ALIGNMENT) => {
  pipe(
    nodeKey,
    getImageNodeByKey,
    Omap((imageNode) => {
      imageNode.setAlignment(alignment)
    }),
  )
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
  const alignmentContainerReference = useRef<HTMLDivElement>(null)
  const [editor] = useLexicalComposerContext()
  const isResizing = useAtomValue(isResizingAtom)
  const currentAlignment = useAtomValue(imageAlignmentAtom)
  const [isSelected, setSelected, clearSelection] =
    useLexicalNodeSelection(nodeKey)

  const onResize = (width: number, height: number) => {
    editor.update(() => {
      setImageNodeDimensions(nodeKey, width, height)
    })
  }

  const onSetAlignment = (alignment: ALIGNMENT) => {
    editor.update(() => {
      setImageNodeAlignment(nodeKey, alignment)
    })
  }

  const targetIsImageReference = (target: EventTarget) =>
    target === imageReference.current

  const targetIsAlignmentContainerReference = (target: EventTarget) =>
    target === alignmentContainerReference.current

  useEffect(() => {
    const unregisterClickListener = editor.registerCommand(
      CLICK_COMMAND,
      (payload: MouseEvent) => {
        // isResizing check prevents the selection from being cleared after resizing the image
        // since returning true will prevent other CLICK_COMMAND listeners. There seems to
        // be another command listener registered that clears the editor selection.
        if (isResizing) return true
        const imageSelectCondition = pipe(
          targetIsAlignmentContainerReference,
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
      ref={alignmentContainerReference}
      sx={{ width: "100%" }}
      flexDirection="row"
      justifyContent={match(currentAlignment)
        .with(ALIGNMENT.LEFT, () => "start")
        .with(ALIGNMENT.CENTER, () => "center")
        .with(ALIGNMENT.RIGHT, () => "end")
        .exhaustive()}>
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

export {
  ImageComponent,
  getImageNodeByKey,
  setImageNodeDimensions,
  setImageNodeAlignment,
}
