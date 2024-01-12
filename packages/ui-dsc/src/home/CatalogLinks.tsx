import Grid from "@material-ui/core/Grid"
import { fromNullable, getOrElse } from "fp-ts/Option"
import { pipe } from "fp-ts/function"
import { match } from "ts-pattern"
import { HomepageColumn } from "./HomepageColumn"
import {
  materialsLinks,
  additionalMaterial,
  additionalMaterialAuth,
} from "../linkLists"

type CatalogLinksProperties = {
  isAuthorized?: boolean
}

const CatalogLinks = ({ isAuthorized }: CatalogLinksProperties) => {
  const allLinks = pipe(
    fromNullable(isAuthorized),
    getOrElse(() => false),
    (b) =>
      match(b)
        .with(false, () => Array.of(...materialsLinks, additionalMaterial))
        .with(true, () => Array.of(...materialsLinks, additionalMaterialAuth))
        .exhaustive(),
  )

  return (
    <Grid container item xs={4} direction="column">
      <HomepageColumn title="Catalogs/Materials" entries={allLinks} />
    </Grid>
  )
}

export { CatalogLinks }
