import Grid from "@material-ui/core/Grid"
import { HomepageColumn } from "./HomepageColumn"
import { materialsLinks } from "../linkLists"

const CatalogLinks = () => (
  <Grid container item xs={4} direction="column">
    <HomepageColumn title="Catalogs/Materials" entries={materialsLinks} />
  </Grid>
)

export { CatalogLinks }
