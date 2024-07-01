import { Grid, Typography, makeStyles } from "@material-ui/core"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { RecentStockItem } from "./RecentStockItem"
import { recentPlasmidItems } from "./recentStockItemsData"

const useRecentPlasmidItemStyles = makeStyles({
  root: {
    rowGap: "0.25rem",
  },
})

const RecentPlasmidItems = () => {
  const { root } = useRecentPlasmidItemStyles()
  return (
    <Grid container direction="column" alignItems="center" className={root}>
      <Grid item>
        <Typography variant="h3"> Plasmids </Typography>
      </Grid>
      {pipe(
        recentPlasmidItems,
        Amap(({ id, name, dateAdded }) => (
          <RecentStockItem id={id} name={name} dateAdded={dateAdded} />
        )),
      )}
    </Grid>
  )
}

export { RecentPlasmidItems }
