import { makeStyles } from "@material-ui/core/styles"
import { Theme } from "@material-ui/core/styles/createMuiTheme"

const useStyles = makeStyles((theme: Theme) => ({
  sidebar: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
}))

export default useStyles
