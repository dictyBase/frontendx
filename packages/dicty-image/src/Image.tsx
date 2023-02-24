import { useState } from "react"
import { Container } from "@material-ui/core"
import ErrorDisplay from "./ErrorDisplay"
import LoadingDisplay from "./LoadingDisplay"
import { imageStyles } from "./imageStyles"
import { Either, left, right, match } from "fp-ts/Either"
import { pipe } from "fp-ts/function"

type ImageProperties = {
  webpSrc: string
  avifSrc: string
  src: string
  alt?: string
  height?: string
  width?: string
  fit?: string
  duration?: number
  easing?: string
}

type LoadErrorStatus = Either<boolean, boolean>

const matchAndDisplay = (status: LoadErrorStatus) => {
  return pipe(
    status,
    match(
      () => <ErrorDisplay />,
      () => <LoadingDisplay />,
    ),
  )
}

const Image = ({
  src,
  webpSrc,
  avifSrc,
  alt,
  height = "100%",
  width = "100%",
  fit = "fill",
  easing = "cubic-bezier(0.7, 0, 0.6, 1)",
  duration = 3000,
}: ImageProperties) => {
  const [status, setStatus] = useState<LoadErrorStatus>(right(true))
  const { root, image } = imageStyles({
    height,
    width,
    fit,
    duration,
    easing,
  })
  return (
    <Container disableGutters className={root!}>
      <picture
        className={image!}
        onLoad={() => setStatus(right(false))}
        onError={() => setStatus(left(true))}>
        <source srcSet={avifSrc} type="image/avif" />
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={src}
          alt={alt}
          className={image!}
          onLoad={() => setStatus(right(false))}
          onError={() => setStatus(left(true))}
        />
      </picture>
      {matchAndDisplay(status)}
    </Container>
  )
}

export default Image
