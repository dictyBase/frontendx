import { Grid, Typography, makeStyles } from "@material-ui/core"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { RecentStockItem } from "./RecentStockItem"
import { recentStrainItems } from "./recentStockItemsData"

const useRecentStrainItemStyles = makeStyles({
  root: {
    rowGap: "0.25rem",
  },
})
const RecentStrainItems = () => {
  const { root } = useRecentStrainItemStyles()
  return (
    <Grid container direction="column" alignItems="center" className={root}>
      <Grid item>
        <Typography variant="h3"> Strains </Typography>
      </Grid>
      {pipe(
        recentStrainItems,
        Amap(({ id, name, dateAdded }) => (
          <RecentStockItem key={id} id={id} name={name} dateAdded={dateAdded} />
        )),
      )}
    </Grid>
  )
}

export { RecentStrainItems }
