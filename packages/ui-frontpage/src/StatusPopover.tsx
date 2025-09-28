import { Link } from "react-router-dom"
import { Typography, Tooltip, Grid } from "@mui/material"
import { styled } from "@mui/material/styles"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import { grey, green, yellow, red } from "@mui/material/colors"
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

const StyledTooltip = styled(Tooltip)({
  '& .MuiTooltip-tooltip': {
    backgroundColor: "white",
    paddingLeft: 0,
    paddingRight: 0,
    boxShadow: `${grey[500]} 1px 1px 3px`,
  },
})

const StyledGrid = styled(Grid)({
  width: "fit-content",
})

const StyledTypography = styled(Typography)<{ status: AggregateStatus }>(({ status }) => ({
  color: match(status)
    .with(AggregateStatus.UP, () => green[500])
    .with(AggregateStatus.PARTIAL, () => yellow[900])
    .with(AggregateStatus.DOWN, () => red[900])
    .exhaustive(),
  textDecoration: "underline",
}))

const StyledIcon = styled(FiberManualRecordIcon)<{ status: AggregateStatus }>(({ status }) => ({
  color: match(status)
    .with(AggregateStatus.UP, () => green[500])
    .with(AggregateStatus.PARTIAL, () => yellow[700])
    .with(AggregateStatus.DOWN, () => red[900])
    .exhaustive(),
}))

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
  return (
    <StyledTooltip
      interactive
      title={<StatusList summaries={summaries} />}>
      <StyledGrid container spacing={1} alignItems="flex-start">
        <Grid item>
          <StyledIcon status={aggregateStatus} />
        </Grid>
        <Grid item>
          <Link to="https://status.dictybase.dev/">
            <StyledTypography variant="h3" status={aggregateStatus}>
              Live Site Status
            </StyledTypography>
          </Link>
        </Grid>
      </StyledGrid>
    </StyledTooltip>
  )
}

export { StatusPopover }
