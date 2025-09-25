import { keyframes } from "@mui/material/styles"

export type StyleProperties = {
  height: number
  width: number
  fit: string
  duration: number
  easing: string
  loading: boolean
  error: boolean
}

const materialize = keyframes`
  0% {
    filter: saturate(20%) contrast(50%) brightness(160%);
    opacity: 0;
  }
  75% {
    filter: saturate(60%) contrast(100%) brightness(100%);
    opacity: 1;
  }
  100% {
    filter: saturate(100%) contrast(100%) brightness(100%);
    opacity: 1;
  }
`

const useImageStyles = (properties: StyleProperties) => ({
  root: {
    position: "relative" as const,
    height: properties.height ? `${properties.height}px` : "auto",
    width: properties.width ? `${properties.width}px` : "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  image: {
    aspectRatio: "1",
    width: "100%",
    height: "100%",
    objectFit: properties.fit as any,
    animationName: materialize,
    animationDuration: `${properties.duration}ms`,
    animationTimingFunction: properties.easing,
    zIndex: properties.error ? -1 : 1,
  },
  icons: {
    width: "100%",
    marginLeft: "-100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
})

export { useImageStyles }
