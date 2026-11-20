import { useState } from "react"
import { Box, Container } from "@mui/material"
import { pipe } from "fp-ts/function"
import {
  error,
  success,
  loading,
  match,
  SelectState,
} from "@dictybase/functional"
import { ErrorDisplay } from "./ErrorDisplay"
import { LoadingDisplay } from "./LoadingDisplay"

type ImageProperties = {
  avifSrc?: string
  webpSrc?: string
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
const Noop = () => <></>
const Image = ({
  src,
  avifSrc,
  webpSrc,
  alt,
  height = "100%",
  width = "100%",
  fit = "fill",
  easing = "cubic-bezier(0.7, 0, 0.6, 1)",
  duration = 750,
}: ImageProperties) => {
  const [status, setStatus] = useState<SelectState<string, string>>(loading())
  const imageSx = {
    width: "100%",
    height: "100%",
    objectFit: fit,
    animationName: "materialize",
    animationDuration: `${duration}ms`,
    animationTimingFunction: easing,
    "@keyframes materialize": {
      "0%": {
        filter: "saturate(20%) contrast(50%) brightness(160%)",
        opacity: 0,
      },
      "75%": {
        filter: "saturate(60%) contrast(100%) brightness(100%)",
        opacity: 1,
      },
      "100%": {
        filter: "saturate(100%) contrast(100%) brightness(100%)",
        opacity: 1,
      },
    },
  }
  return (
    <Container
      disableGutters
      sx={{
        height,
        width,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Box
        component="picture"
        sx={imageSx}
        onLoad={() => setStatus(success("loaded image"))}
        onError={() => setStatus(error("error in loading image"))}>
        <source srcSet={webpSrc} type="image/webp" />
        <source srcSet={avifSrc} type="image/avif" />
        <Box
          component="img"
          src={src}
          alt={alt}
          sx={imageSx}
          onLoad={() => setStatus(success("loaded image"))}
          onError={() => setStatus(error("error in loading image"))}
        />
      </Box>
      {pipe(status, match(LoadingUI, ErrorUI, Noop))}
    </Container>
  )
}

export { Image }
