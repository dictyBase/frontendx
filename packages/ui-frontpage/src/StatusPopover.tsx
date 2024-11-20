import { Link } from "react-router-dom"
import { Typography, Tooltip, Grid, makeStyles } from "@material-ui/core"
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord"
import { grey, green, yellow, red } from "@material-ui/core/colors"
import { match, P } from "ts-pattern"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { UptimeProperties, Status } from "./types"
import { StatusList } from "./StatusList"

enum AggregateStatus {
  UP = "up",
  DOWN = "down",
  PARTIAL = "partial",
}

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
    color: ({ status }: { status: AggregateStatus }) =>
      match(status)
        .with(AggregateStatus.UP, () => green[500])
        .with(AggregateStatus.PARTIAL, () => yellow[900])
        .with(AggregateStatus.DOWN, () => red[900])
        .exhaustive(),
    textDecoration: "underline",
  },
  indicator: {
    color: ({ status }: { status: AggregateStatus }) =>
      match(status)
        .with(AggregateStatus.UP, () => green[500])
        .with(AggregateStatus.PARTIAL, () => yellow[700])
        .with(AggregateStatus.DOWN, () => red[900])
        .exhaustive(),
  },
})

type StatusListProperties = {
  summaries: Array<UptimeProperties>
}

const StatusPopover = ({ summaries }: StatusListProperties) => {
  const aggregateStatus = pipe(
    summaries,
    Amap(({ status }) => status),
    (statuses) =>
      match(statuses)
        .with(P.array(Status.UP), () => AggregateStatus.UP)
        .with(P.array(Status.DOWN), () => AggregateStatus.DOWN)
        .otherwise(() => AggregateStatus.PARTIAL),
  )
  const { root, text, indicator, tooltip } = useStyles({
    status: aggregateStatus,
  })
  return (
    <Tooltip
      interactive
      title={<StatusList summaries={summaries} />}
      classes={{ tooltip }}>
      <Grid container spacing={1} alignItems="flex-start" className={root}>
        <Grid item>
          <FiberManualRecordIcon className={indicator} />
        </Grid>
        <Grid item>
          <Link to="https://status.dictybase.dev/">
            <Typography variant="h3" className={text}>
              Live Site Status
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Tooltip>
  )
}

export { StatusPopover }
