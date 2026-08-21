import { ImageComponent } from "./ImageComponent"
import { Provider, createStore } from "jotai"
import { ImageDimensionsAtom } from "@dictybase/resizable-image"

export type ImageStateWrapperProperties = {
  src: string
  nodeKey: string
  initialWidth: number
  initialHeight: number
  alt?: string | undefined
  fit: string
  duration: number
  easing: string
}

const imageDimensionStore = createStore()

const ImageStateWrapper = ({
  src,
  alt,
  initialWidth,
  initialHeight,
  nodeKey,
  fit,
  easing,
  duration,
}: ImageStateWrapperProperties) => {
  imageDimensionStore.set(ImageDimensionsAtom, {
    width: initialWidth,
    height: initialHeight,
  })
  return (
    <Provider store={imageDimensionStore}>
      <ImageComponent
        nodeKey={nodeKey}
        src={src}
        alt={alt}
        initialWidth={initialWidth}
        initialHeight={initialHeight}
        fit={fit}
        easing={easing}
        duration={duration}
      />
    </Provider>
  )
}

export { ImageStateWrapper }
