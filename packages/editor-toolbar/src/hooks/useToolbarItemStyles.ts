import { makeStyles } from "@material-ui/core"

const useToolbarItemStyles = makeStyles({
  root: {
    border: "0",
    display: "flex",
    background: "none",
    borderRadius: "10px",
    padding: "8px",
    cursor: "pointer",
    verticalAlign: "middle",
    marginRight: "2px",
    "&:disabled": {
      cursor: "not-allowed",
      "& i": {
        opacity: "0.2",
      },
    },
    "& i": {
      backgroundSize: "contain",
      display: "inline-block",
      height: "18px",
      width: "18px",
      marginTop: "2px",
      verticalAlign: "-0.25em",
      opacity: "0.6",
    },
  },
  spaced: {
    marginRight: "7px",
    marginLeft: "7px",
  },
  active: {
    backgroundColor: "rgba(223, 232, 250, 0.3)",
    "& i": {
      opacity: "1",
    },
  },
})

export default useToolbarItemStyles
