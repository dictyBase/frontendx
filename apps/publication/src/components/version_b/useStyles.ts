import { makeStyles } from "@material-ui/core/styles"
import { blueGrey } from "@material-ui/core/colors"

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(2),
    boxShadow: `0 4px 4px ${blueGrey[200]} `,
    zIndex: 1,
  },
  body: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    backgroundColor: blueGrey[100],
    maxHeight: "50vh",
    overflow: "scroll",
    zIndex: 0,
  },
  sidebar: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
    zIndex: 2,
  },
}))

export { useStyles }
