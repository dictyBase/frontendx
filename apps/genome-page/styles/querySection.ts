import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  titleBox: {
    position: "relative",
    top: 15,
    backgroundColor: "#DFE8F6",
    border: "1px solid",
    borderColor: "#A3BAE9",
    textAlign: "center",
    maxWidth: 150,
    marginLeft: 25,
  },
  titleBoxText: {
    color: "#336699",
    fontSize: "16px",
  },
  boldText: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  text: {
    fontSize: "14px",
  },
  card: {
    padding: 20,
    backgroundColor: "#F2F2F2",
  },
  textArea: {
    padding: 0,
    fontSize: 12,
    width: "100%",
  },
})

export default useStyles
