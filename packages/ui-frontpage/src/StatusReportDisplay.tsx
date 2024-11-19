import { makeStyles, Typography, Grid } from "@material-ui/core"
import { pipe } from "fp-ts/function"
import {
  replace as Sreplace,
  Monoid as SMonoid,
  toLowerCase as StoLowerCase,
} from "fp-ts/string"
import { map as Amap } from "fp-ts/Array"
import { getOrElse as OgetOrElse } from "fp-ts/Option"
import { lookup as Rlookup } from "fp-ts/Record"
import { UptimeProperties } from "./types"
import { StatusReport } from "./StatusReport"

const SiteNames = {
  DCR: "Dicty CR",
  "DCR dev": "Dev Site",
  "DCR news pages": "DCR News",
  "DSC dev": "Stock Center",
}

type StatusReportDisplayProperties = {
  summaries: Array<UptimeProperties>
}

const useStyles = makeStyles({
  text: {
    fontFamily: "'Nimbus Mono PS', 'Courier New', monospace",
  },
})

const StatusReportDisplay = ({ summaries }: StatusReportDisplayProperties) => {
  const { text } = useStyles()
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Typography className={text}>Live Site Status</Typography>
      </Grid>
      {pipe(
        summaries,
        Amap(({ name, status }) => {
          const resolvedName = pipe(
            SiteNames,
            Rlookup(name),
            OgetOrElse(() => name),
          )
          const nameSegment = pipe(name, StoLowerCase, Sreplace(/\s/g, "-"))
          const url = SMonoid.concat(
            "https://status.dictybase.dev/history/",
            nameSegment,
          )
          return (
            <Grid item>
              <StatusReport name={resolvedName} url={url} status={status} />
            </Grid>
          )
        }),
      )}
    </Grid>
  )
}

export { StatusReportDisplay }
