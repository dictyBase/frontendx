import { makeStyles } from "@material-ui/core/styles"
import { blueGrey, grey, indigo, cyan, teal } from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
  content: {
    // padding: theme.spacing(2),
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
