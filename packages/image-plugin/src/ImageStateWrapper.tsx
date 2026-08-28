import { useEffect, useRef } from "react"
import { Provider, createStore } from "jotai"
import {
  imageDimensionsAtom,
  imageAlignmentAtom,
} from "@dictybase/resizable-image"
import { ImageComponent } from "./ImageComponent"
import { ALIGNMENT } from "./ImageNode"

export type ImageStateWrapperProperties = {
  src: string
  nodeKey: string
  initialWidth: number
  initialHeight: number
  initialAlignment: ALIGNMENT
  alt?: string | undefined
  fit: string
  duration: number
  easing: string
}

const ImageStateWrapper = ({
  src,
  alt,
  initialWidth,
  initialHeight,
  initialAlignment,
  nodeKey,
  fit,
  easing,
  duration,
}: ImageStateWrapperProperties) => {
  const imagePropertyStore = useRef(createStore())

  useEffect(() => {
    imagePropertyStore.current.set(imageDimensionsAtom, {
      width: initialWidth,
      height: initialHeight,
    })
    imagePropertyStore.current.set(imageAlignmentAtom, initialAlignment)
  }, [initialWidth, initialHeight, initialAlignment])

  return (
    <Provider store={imagePropertyStore.current}>
      <ImageComponent
        nodeKey={nodeKey}
        src={src}
        alt={alt}
        fit={fit}
        easing={easing}
        duration={duration}
      />
    </Provider>
  )
}

export { ImageStateWrapper }
