import { ImageComponent } from "./ImageComponent"
import { Provider, createStore } from "jotai"
import {
  imageDimensionsAtom,
  imageAlignmentAtom,
} from "@dictybase/resizable-image"
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
  const imagePropertyStore = createStore()
  imagePropertyStore.set(imageDimensionsAtom, {
    width: initialWidth,
    height: initialHeight,
  })
  imagePropertyStore.set(imageAlignmentAtom, initialAlignment)

  return (
    <Provider store={imagePropertyStore}>
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
