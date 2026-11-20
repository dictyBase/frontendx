import { deepPurple, grey } from "@mui/material/colors"

const errorStyles = {
  error400: {
    backgroundColor: "#eff8fb",
    textAlign: "center",
    paddingTop: "30px",
    paddingBottom: "30px",
    marginBottom: "30px",
    borderRadius: "5px",
  },
  error500: {
    backgroundColor: "#a63232",
    textAlign: "center",
    paddingTop: "40px",
    paddingBottom: "40px",
    marginBottom: "30px",
    borderRadius: "5px",
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
    backgroundColor: "secondary.main",
    "&:hover": {
      backgroundColor: "secondary.dark",
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
    backgroundColor: deepPurple[50],
    maxWidth: "20rem",
    margin: "auto",
    borderRadius: "7px",
    fontStyle: "italic",
    border: `1px solid ${grey[400]}`,
  },
}

export { errorStyles }
