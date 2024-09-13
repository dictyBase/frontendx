import { Container, List, ListItem, Paper } from "@material-ui/core"
import { useStrainQuery, Phenotype, StrainQuery } from "dicty-graphql-schema"
import { Ord as sOrd } from "fp-ts/string"
import { pipe } from "fp-ts/function"
import { contramap, Ord } from "fp-ts/lib/Ord"
import { sort, map } from "fp-ts/Array"
import { StrainPhenotypeListHeader } from "./StrainPhenotypeListHeader"
import { StrainPhenotypeListItem } from "./StrainPhenotypeListItem"
import { useStyles } from "./phenotypeStyles"

type Properties = {
  phenotypes: NonNullable<NonNullable<StrainQuery["strain"]>["phenotypes"]>
}

const byPhenotype: Ord<Pick<Phenotype, "phenotype">> = pipe(
  sOrd,
  contramap((phenotype) => phenotype.phenotype),
)

/**
 * PhenotypeList provides a list of phenotypes for a given strain.
 */

const ExistingPhenotypeList = ({ phenotypes }: Properties) => {
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

export { ExistingPhenotypeList }
