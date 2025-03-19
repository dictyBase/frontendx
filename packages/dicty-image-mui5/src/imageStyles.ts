import { makeStyles } from "tss-react/mui"

type StyleProperties = {
  height: string
  width: string
  fit: string
  duration: number
  easing: string
}

const imageStyles = makeStyles<StyleProperties>()(
  (_, { height, width, fit, duration, easing }) => ({
    root: {
      height,
      width,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: "100%",
      height: "100%",
      "object-fit": fit,
      animationName: `$materialize`,
      animationDuration: `${duration}ms`,
      animationTimingFunction: easing,
    },
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
  }),
)

const iconStyles = makeStyles()({
  icons: {
    width: "100%",
    marginLeft: "-100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
})

export { imageStyles, iconStyles }
