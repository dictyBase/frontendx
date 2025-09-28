import { Grid, Typography } from "@mui/material"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { RecentStockItem } from "./RecentStockItem"
import { recentPlasmidItems } from "./recentStockItemsData"

const RecentPlasmidItems = () => (
  <Grid
    container
    direction="column"
    alignItems="center"
    sx={{ rowGap: "0.25rem" }}>
    <Grid item>
      <Typography variant="h3"> Plasmids </Typography>
    </Grid>
    {pipe(
      recentPlasmidItems,
      Amap(({ id, name, dateAdded }) => (
        <RecentStockItem key={id} id={id} name={name} dateAdded={dateAdded} />
      )),
    )}
  </Grid>
)

export { RecentPlasmidItems }
