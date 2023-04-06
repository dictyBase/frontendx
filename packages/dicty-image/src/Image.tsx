import { useState } from "react"
import { Container } from "@material-ui/core"
import { pipe } from "fp-ts/function"
import {
  error,
  success,
  loading,
  match,
  SelectState,
} from "@dictybase/functional"
import { imageStyles } from "./imageStyles"
import ErrorDisplay from "./ErrorDisplay"
import LoadingDisplay from "./LoadingDisplay"

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

const LoadingUI = () => <LoadingDisplay />
const ErrorUI = () => <ErrorDisplay />
const Noop = () => <div>error error</div>
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
  const [status, setStatus] = useState<SelectState<string, string>>(loading())
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
        onLoad={() => setStatus(success("loaded image"))}
        onError={() => setStatus(error("error in loading image"))}>
        <source srcSet={avifSrc} type="image/avif" />
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={src}
          alt={alt}
          className={image!}
          onLoad={() => setStatus(success("loaded image"))}
          onError={() => setStatus(error("error in loading image"))}
        />
      </picture>
      {pipe(status, match(LoadingUI, ErrorUI, Noop))}
    </Container>
  )
}

export { Image }
