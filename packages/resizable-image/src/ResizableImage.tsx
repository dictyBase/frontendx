import { useRef, useState, CSSProperties } from "react"
import { useAtomValue } from "jotai"
import { Container } from "@mui/material"
import { imageAlignmentAtom, imageDimensionsAtom } from "./state"
import { LoadingDisplay } from "./LoadingDisplay"
import { ErrorDisplay } from "./ErrorDisplay"
import { ImageResizer } from "./ImageResizer"
import { AlignmentControls } from "./AlignmentControls"
import { useImageStyles } from "./useImageStyles"
import { ALIGNMENT } from "./types"

export type ImageProperties = {
  src: string
  alt?: string | undefined
  imageReference: React.MutableRefObject<HTMLImageElement | null>
  fit: string
  duration: number
  easing: string
  isSelected: boolean
  onResize: (width: number, height: number) => void
  onSetAlignment: (alignment: ALIGNMENT) => void
}

const ResizableImage = ({
  src,
  alt,
  imageReference,
  fit = "contain",
  easing = "cubic-bezier(0.7, 0, 0.6, 1)",
  duration = 2000,
  isSelected,
  onResize,
  onSetAlignment,
}: ImageProperties) => {
  const dimensions = useAtomValue(imageDimensionsAtom)
  const alignment = useAtomValue(imageAlignmentAtom)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const imageContainerReference = useRef<HTMLImageElement>(null)
  const styles = useImageStyles({
    fit,
    easing,
    duration,
    loading,
    error,
  })

  const handleError = () => {
    setLoading(false)
    setError(true)
  }

  return (
    <Container
      draggable={isSelected}
      ref={imageContainerReference}
      disableGutters
      sx={{
        position: "relative" as const,
        height: "var(--height)",
        width: "var(--width)",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "black",
        marginRight: alignment === ALIGNMENT.RIGHT ? 0 : "auto",
        marginLeft: alignment === ALIGNMENT.LEFT ? 0 : "auto",
        margin: alignment === ALIGNMENT.CENTER ? "auto" : undefined,
      }}
      style={
        {
          "--height": dimensions.height ? `${dimensions.height}px` : "auto",
          "--width": dimensions.width ? `${dimensions.width}px` : "auto",
        } as CSSProperties
      }>
      <img
        ref={imageReference}
        src={src}
        alt={alt}
        style={styles.image}
        onLoad={() => setLoading(false)}
        onError={handleError}
      />
      {loading ? <LoadingDisplay /> : undefined}
      {error ? <ErrorDisplay /> : undefined}
      {imageContainerReference.current && isSelected ? (
        <ImageResizer onResize={onResize} />
      ) : undefined}
      {imageContainerReference.current && isSelected ? (
        <AlignmentControls onSetAlignment={onSetAlignment} />
      ) : undefined}
    </Container>
  )
}

export { ResizableImage }
