import { Grid } from "@material-ui/core"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { toArray as RtoArray } from "fp-ts/Record"
import { Status, UptimeProperties } from "./types"
import { StatusReport } from "./StatusReport"

const SiteNames = {
  DCR: "Dicty CR",
  "DCR dev": "Dev Site",
  "DCR news pages": "Dev Site",
  "DSC dev": "Stock Center",
}

type StatusReportDisplayProperties = {
  summaries: Array<UptimeProperties>
}
/**
 * DATA UNDEFINED -> UNAVAILABLE, GREY
 * DATA, STATUS UP -> GREEN
 * DATA, STATUS DOWN -> ORANGE
 */
const StatusReportDisplay = ({ summaries }: StatusReportDisplayProperties) => (
  <Grid container spacing={2}>
    {pipe(
      summaries,
      Amap(({ name, url, status }) => (
        <Grid item>
          <StatusReport name={name} url={url} status={status} />
        </Grid>
      )),
    )}
  </Grid>
)

export { StatusReportDisplay }
