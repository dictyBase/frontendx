import createStyles from "@material-ui/core/styles/createStyles"
import { Theme } from "@material-ui/core/styles/createMuiTheme"

const styles = (theme: Theme) =>
  createStyles({
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
    title: {
      textAlign: "center",
    },
    sidebar: {
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
      },
    },
  })

export default styles
