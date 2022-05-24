import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  head: {
    backgroundColor: "#e6f2ff",
  },
  headRow: {
    "& > th": {
      fontWeight: "bold",
    },
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  col: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  titleBox: {
    position: "absolute",
    marginTop: "-10px",
    backgroundColor: "#DFE8F6",
    border: "1px solid",
    borderColor: "#A3BAE9",
    textAlign: "center",
    paddingLeft: 5,
    paddingRight: 5,
    maxWidth: 200,
    marginLeft: 25,
    zIndex: 5,
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
    minHeight: 200,
  },
  textArea: {
    padding: 0,
    fontSize: 12,
    width: "100%",
  },
  contentBox: {
    marginTop: 20,
    minWidth: 450,
    maxWidth: 550,
    width: "100%",
    minHeight: 300,
  },
})

export default useStyles
