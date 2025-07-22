import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  error400: {
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
    borderRadius: 5,
    marginTop: "3rem",
    marginBottom: "3rem",
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
})

export { useStyles }
