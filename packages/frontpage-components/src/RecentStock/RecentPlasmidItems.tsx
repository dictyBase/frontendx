import { Grid, makeStyles } from "@material-ui/core"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { RecentStockItem } from "./RecentStockItem"
import { recentPlasmidItems } from "./recentStockItemsData"

const useRecentPlasmidItemStyles = makeStyles({
  root: {},
})

const RecentPlasmidItems = () => {
  const { root } = useRecentPlasmidItemStyles()
  return (
    <Grid container className={root}>
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
