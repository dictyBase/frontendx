import { makeStyles } from "@material-ui/core"

const useNewsPreviewStyles = makeStyles({
  root: {
    padding: "1rem",
    height: "150px",
    width: "100%",
    textOverflow: "ellipsis",
  },
  checkbox: {
    padding: "0",
    paddingLeft: "9px",
    paddingRight: "9px",
  },
})

export { useNewsPreviewStyles }
