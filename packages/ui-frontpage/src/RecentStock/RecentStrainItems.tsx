import { Grid, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { RecentStockItem } from "./RecentStockItem"
import { recentStrainItems } from "./recentStockItemsData"

const StyledGrid = styled(Grid)({
  rowGap: "0.25rem",
})
const RecentStrainItems = () => {
  return (
    <StyledGrid container direction="column" alignItems="center">
      <Grid item>
        <Typography variant="h3"> Strains </Typography>
      </Grid>
      {pipe(
        recentStrainItems,
        Amap(({ id, name, dateAdded }) => (
          <RecentStockItem key={id} id={id} name={name} dateAdded={dateAdded} />
        )),
      )}
    </StyledGrid>
  )
}

export { RecentStrainItems }
