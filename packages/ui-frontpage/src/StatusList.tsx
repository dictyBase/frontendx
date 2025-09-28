import { Grid } from "@mui/material"
import { styled } from "@mui/material/styles"
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

const StyledGrid = styled(Grid)({
  backgroundColor: "white",
})

type StatusListProperties = {
  summaries: Array<UptimeProperties>
}

const StatusList = ({ summaries }: StatusListProperties) => {
  return (
    <StyledGrid container direction="column">
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
    </StyledGrid>
  )
}

export { StatusList }
