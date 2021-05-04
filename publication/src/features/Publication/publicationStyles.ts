import { makeStyles } from "@material-ui/core/styles"
import { Theme } from "@material-ui/core/styles/createMuiTheme"

const useStyles = makeStyles((theme: Theme) => ({
  layout: {
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.up(1300 + theme.spacing(3) * 2)]: {
      width: 1300,
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  sidebar: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
}))

export default useStyles
