import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  container: {
    columnGap: theme.spacing(1.5),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(6)
  },
  sidebar: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
}))

export { useStyles }
