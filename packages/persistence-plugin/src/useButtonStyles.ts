import { makeStyles } from "tss-react/mui"

const useButtonStyles = makeStyles()({
  root: {
    width: "160px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
})

export { useButtonStyles }
