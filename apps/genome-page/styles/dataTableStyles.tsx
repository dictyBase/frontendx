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
  icon: {
    margin: "0px 5px 5px 0px",
  },
  cell: {
    padding: "4px",
  },
  cellIcons: {
    padding: "4px",
    textAlign: "right",
    width: "100px",
  },
  referenceCell: {
    padding: "4px 56px 4px 24px",
  },
  referenceColumn: {
    minWidth: "70%",
  },
})

export { useStyles }
