import { makeStyles } from "@material-ui/core/styles"
import { indigo, grey } from "@material-ui/core/colors"

const useStyles = makeStyles(({ palette }) => ({
  error400: {
    backgroundColor: "#eff8fb",
    textAlign: "center",
    paddingTop: 30,
    paddingBottom: 30,
    marginBottom: 30,
    borderRadius: 5,
  },
  error500: {
    backgroundColor: "#a63232",
    textAlign: "center",
    paddingTop: 40,
    paddingBottom: 40,
    marginBottom: 30,
    borderRadius: 5,
    color: "#e3e3e3",
  },
  link500: {
    color: "#e0e0e0",
    textDecoration: "none",
  },
  mainGrid: {
    marginTop: "40px",
  },
  paragraph: {
    padding: "10px",
  },
  list: {
    margin: "0 auto",
    display: "table",
  },
  addPageButton: {
    width: "25%",
    marginTop: "25px",
    padding: "25px",
    textTransform: "none",
    backgroundColor: palette.secondary.main,
    "&:hover": {
      backgroundColor: palette.secondary.dark,
    },
  },
  link: {
    color: "#428bca",
    textDecoration: "none",
  },
  description: {
    fontFamily: "'Nimbus Mono PS', 'Courier New', monospace",
    color: grey[800],
    padding: "1rem",
    backgroundColor: indigo[50],
    maxWidth: "20rem",
    margin: "auto",
    borderRadius: "7px",
    fontStyle: "italic",
    border: `1px solid ${grey[400]}`,
    // boxShadow: `${grey[800]} 1px 1px 2px`,
  },
}))

export { useStyles }
