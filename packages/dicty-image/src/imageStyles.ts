import { makeStyles, Theme } from "@material-ui/core"

type StyleProperties = {
  height: string
  width: string
  fit: string
  duration: number
  easing: string
  loading: boolean
}

const imageStyles = makeStyles<Theme, StyleProperties>({
  root: {
    height: ({ height }) => height,
    width: ({ width }) => width,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  image: {
    width: "100%",
    height: "100%",
    "object-fit": ({ fit }) => fit,
    animationName: `$materialize`,
    animationDuration: ({ duration }) => `${duration}ms`,
    animationTimingFunction: ({ easing }) => easing,
  },
  icons: {
    width: "100%",
    marginLeft: "-100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
})

export default imageStyles
