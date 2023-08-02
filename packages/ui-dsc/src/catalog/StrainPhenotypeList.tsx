import { Ord as sOrd } from "fp-ts/string"
import { pipe } from "fp-ts/function"
import { contramap, Ord } from "fp-ts/lib/Ord"
import { sort, map } from "fp-ts/Array"
import Paper from "@material-ui/core/Paper"
import { Phenotype } from "dicty-graphql-schema"
import { StrainPhenotypeListHeader } from "./StrainPhenotypeListHeader"
import { StrainPhenotypeListItem } from "./StrainPhenotypeListItem"
import { useStyles } from "./phenotypeStyles"

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

const StrainPhenotypeList = ({ phenotypes }: Properties) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
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
}

export { StrainPhenotypeList }
