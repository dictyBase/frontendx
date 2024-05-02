import { Grid, makeStyles } from "@material-ui/core"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { RecentStockItem } from "./RecentStockItem"
import { recentStrainItems } from "./recentStockItemsData"

const useRecentStrainItemStyles = makeStyles({
  root: {},
})
const RecentStrainItems = () => {
  const { root } = useRecentStrainItemStyles()
  return (
    <Grid container className={root}>
      {pipe(
        recentStrainItems,
        Amap(({ id, name, dateAdded }) => (
          <RecentStockItem id={id} name={name} dateAdded={dateAdded} />
        )),
      )}
    </Grid>
  )
}

export { RecentStrainItems }
