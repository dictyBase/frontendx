import { makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  row: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.background.default,
    },
  },
  link: {
    textDecoration: "none",
    color: "#4C5E81",
    "&:visited": {
      color: "#4C5E81",
    },
    "&:hover": {
      textDecoration: "underline",
    },
  },
  head: {
    backgroundColor: "#e6f2ff",
  },
  headerCell: {
    color: "#333",
    fontWeight: 600,
  },
}))

export default useStyles
