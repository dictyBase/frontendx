import { Ord as sOrd } from "fp-ts/string"
import { pipe } from "fp-ts/function"
import { contramap, Ord } from "fp-ts/lib/Ord"
import { sort, map } from "fp-ts/Array"
import Paper from "@mui/material/Paper"
import { Phenotype } from "dicty-graphql-schema"
import { StrainPhenotypeListHeader } from "./StrainPhenotypeListHeader"
import { StrainPhenotypeListItem } from "./StrainPhenotypeListItem"

type Properties = {
  phenotypes: Array<Phenotype>
}

const byPhenotype: Ord<Phenotype> = pipe(
  sOrd,
  contramap((phenotype) => phenotype.phenotype),
)

/**
 * PhenotypeList provides a list of phenotypes for a given strain.
 */

const StrainPhenotypeList = ({ phenotypes }: Properties) => (
  <Paper sx={{ width: "100%" }}>
    <StrainPhenotypeListHeader />
    {pipe(
      phenotypes,
      sort(byPhenotype),
      map((phenotype) => (
        <StrainPhenotypeListItem key={phenotype.phenotype} data={phenotype} />
      )),
    )}
  </Paper>
)

export { StrainPhenotypeList }
