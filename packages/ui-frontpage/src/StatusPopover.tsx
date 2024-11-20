import { Link } from "react-router-dom"
import { Typography, Tooltip, Grid, makeStyles } from "@material-ui/core"
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"
import grey from "@material-ui/core/colors/grey"
import { UptimeProperties } from "./types"
import { StatusList } from "./StatusList"

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
    color: "green",
    textDecoration: "underline",
  },
  indicator: {
    color: "green",
  },
})

type StatusListProperties = {
  summaries: Array<UptimeProperties>
}

const StatusPopover = ({ summaries }: StatusListProperties) => {
  const { root, text, indicator, tooltip } = useStyles()
  return (
    <Tooltip
      interactive
      title={<StatusList summaries={summaries} />}
      classes={{ tooltip }}>
      <Grid container alignItems="flex-start" className={root}>
        <Grid item>
          <Link to="https://status.dictybase.dev/">
            <Typography variant="h3" className={text}>
              Live Site Status
            </Typography>
          </Link>
        </Grid>
        <Grid item>
          <FiberManualRecordIcon className={indicator} />
        </Grid>
      </Grid>
    </Tooltip>
  )
}

export { StatusPopover }
