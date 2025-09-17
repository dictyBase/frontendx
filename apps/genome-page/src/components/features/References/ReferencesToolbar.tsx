import { Dispatch, SetStateAction } from "react"
import {
  Grid,
  Toolbar,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { map as Amap } from "fp-ts/Array"
import { keys as Rkeys } from "fp-ts/Record"
import { ReferencesSearchBox } from "./ReferenceSearchBox"
import { orderFunctions, type OrderFunctionKeys } from "./referenceOrderHelpers"

const useStyles = makeStyles((theme) => ({
  select: {
    backgroundColor: theme.palette.background.default,
  },
  label: {
    fontWeight: 700,
  },
  count: {
    fontWeight: 500,
  },
  searchGridItem: {
    flexBasis: "40%",
  },
}))

type ReferencesToolbarProperties = {
  totalPublicationCount: number
  filteredPublicationCount: number
  order: string
  setOrder: Dispatch<SetStateAction<OrderFunctionKeys>>
  searchFields: Array<string>
}

const ReferencesToolbar = ({
  totalPublicationCount,
  filteredPublicationCount,
  searchFields,
  order,
  setOrder,
}: ReferencesToolbarProperties) => {
  const classes = useStyles()
  return (
    <Toolbar variant="dense">
      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <Typography className={classes.count}>
            {pipe(
              filteredPublicationCount === totalPublicationCount,
              Bmatch(
                () => `${filteredPublicationCount} of `,
                () => "",
              ),
            )}
            {totalPublicationCount}{" "}
            {pipe(
              totalPublicationCount === 1,
              Bmatch(
                () => "References",
                () => "Reference",
              ),
            )}
          </Typography>
        </Grid>
        <Grid item>
          <FormControl variant="outlined">
            <InputLabel
              htmlFor="reference-order-select"
              className={classes.label}>
              Sort by
            </InputLabel>
            <Select
              labelId="reference-order-select"
              id="reference-order-select"
              label="Sort by"
              value={order}
              onChange={({ target: { value } }) => {
                setOrder(value as OrderFunctionKeys)
              }}
              className={classes.select}>
              {pipe(
                orderFunctions,
                Rkeys,
                Amap((label) => (
                  <MenuItem key={label} value={label}>
                    {label}
                  </MenuItem>
                )),
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item className={classes.searchGridItem}>
          <ReferencesSearchBox fields={searchFields} />
        </Grid>
      </Grid>
    </Toolbar>
  )
}

export { ReferencesToolbar }
