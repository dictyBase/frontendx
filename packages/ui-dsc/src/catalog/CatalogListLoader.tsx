import { Paper } from "@mui/material"
import { makeStyles } from "tss-react/mui"
import { LoadingDisplay } from "../LoadingDisplay"

const useStyles = makeStyles()((theme) => ({
  root: {
    height: "100%",
    paddingTop: theme.spacing(6),
    padding: theme.spacing(1),
  },
}))

const CatalogListLoader = () => {
  const { classes } = useStyles()
  return (
    <Paper className={classes.root}>
      <LoadingDisplay rows={12} height={40} />
    </Paper>
  )
}

export { CatalogListLoader }
