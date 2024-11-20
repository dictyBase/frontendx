import { Link } from "react-router-dom"
import { Typography, Grid, makeStyles } from "@material-ui/core"
import HighlightOffIcon from "@material-ui/icons/HighlightOff"
import { grey } from "@material-ui/core/colors"

const useStyles = makeStyles({
  tooltip: {
    backgroundColor: "white",
    paddingLeft: 0,
    paddingRight: 0,
    boxShadow: `${grey[500]} 1px 1px 3px`,
  },
  root: {
    width: "fit-content",
  },
  text: {
    textDecoration: "underline",
    color: grey[700],
  },
  indicator: {
    color: grey[700],
  },
})

const SiteStatusUnavailable = () => {
  const { root, text, indicator } = useStyles()
  return (
    <Grid container spacing={1} alignItems="flex-start" className={root}>
      <Grid item>
        <HighlightOffIcon className={indicator} />
      </Grid>
      <Grid item>
        <Link to="https://status.dictybase.dev/">
          <Typography variant="h3" className={text}>
            Site Status Unavailable
          </Typography>
        </Link>
      </Grid>
    </Grid>
  )
}

export { SiteStatusUnavailable }
