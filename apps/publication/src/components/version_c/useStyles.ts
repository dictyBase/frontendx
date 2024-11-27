import { makeStyles } from "@material-ui/core/styles"
import { blueGrey, grey } from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: grey[400],
  },
  foreground: {
    backgroundColor: "white",
    boxShadow: `4px 4px 10px ${blueGrey[600]}, -4px 4px 10px ${blueGrey[600]}`,
  },
  header: {
    padding: theme.spacing(2),
    boxShadow: `0 4px 4px ${blueGrey[200]} `,
  },
  sidebar: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
}))

export { useStyles }
