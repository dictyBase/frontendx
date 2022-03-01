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
})

export default useStyles
