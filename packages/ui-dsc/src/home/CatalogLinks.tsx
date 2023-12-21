import Grid from "@material-ui/core/Grid"
import { HomepageColumn } from "./HomepageColumn"
import {
  materialsLinks,
  additionalMaterial,
  additionalMaterialAuth,
} from "../linkLists"
import { fromNullable, match } from "fp-ts/Option"
import { pipe } from "fp-ts/function"

type CatalogLinksProperties = {
  isAuthorized?: boolean
}

const CatalogLinks = ({ isAuthorized }: CatalogLinksProperties) => {
  const allLinks = pipe(
    fromNullable(isAuthorized),
    match(
      () => Array.of(...materialsLinks, additionalMaterial),
      () => Array.of(...materialsLinks, additionalMaterialAuth),
    ),
  )
  return (
    <Grid container item xs={4} direction="column">
      <HomepageColumn title="Catalogs/Materials" entries={allLinks} />
    </Grid>
  )
}

export { CatalogLinks }
