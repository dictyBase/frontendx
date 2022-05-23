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
    backgroundColor: "#DFE8F6",
    border: "1px solid",
    borderColor: "#A3BAE9",
    textAlign: "center",
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 10,
    maxWidth: 200,
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
    padding: 10,
    backgroundColor: "#F2F2F2",
    minHeight: 200,
  },
  textArea: {
    padding: 0,
    fontSize: 12,
    width: "100%",
  },
  contentBox: {
    minWidth: 450,
    maxWidth: 550,
    width: "100%",
    minHeight: 300,
  },
})

export default useStyles
