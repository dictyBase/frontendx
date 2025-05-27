import { Dispatch, SetStateAction } from "react"
import { Grid, Toolbar, Typography, Select, MenuItem } from "@material-ui/core"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { map as Amap } from "fp-ts/Array"
import { keys as Rkeys } from "fp-ts/Record"
import { orderFunctions, type OrderFunctionKeys } from "./referenceOrderHelpers"

type ReferencesToolbarProperties = {
  publicationCount: number
  order: string
  setOrder: Dispatch<SetStateAction<OrderFunctionKeys>>
}

const ReferencesToolbar = ({
  publicationCount,
  order,
  setOrder,
}: ReferencesToolbarProperties) => (
  <Toolbar variant="dense">
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Typography>
          {publicationCount}{" "}
          {pipe(
            publicationCount > 1,
            Bmatch(
              () => "Reference",
              () => "References",
            ),
          )}
        </Typography>
      </Grid>
      <Grid item>
        <Select
          labelId="reference-sort-select"
          id="reference-sort-select"
          variant="outlined"
          value={order}
          onChange={({ target: { value } }) => {
            setOrder(value as OrderFunctionKeys)
          }}>
          {pipe(
            orderFunctions,
            Rkeys,
            Amap((label) => <MenuItem value={label}>{label}</MenuItem>),
          )}
        </Select>
      </Grid>
    </Grid>
  </Toolbar>
)

export { ReferencesToolbar }

export { orderFunctions, type OrderFunctionKeys } from "./referenceOrderHelpers"
