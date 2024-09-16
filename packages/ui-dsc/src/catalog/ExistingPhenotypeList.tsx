import { Paper, makeStyles } from "@material-ui/core"
import { Phenotype, StrainQuery } from "dicty-graphql-schema"
import { Ord as sOrd } from "fp-ts/string"
import { pipe } from "fp-ts/function"
import { contramap, Ord } from "fp-ts/lib/Ord"
import { sort, map } from "fp-ts/Array"
import { ExistingPhenotypeListHeader } from "./ExistingPhenotypeListHeader"
import { StrainPhenotypeListItem } from "./StrainPhenotypeListItem"

type Properties = {
  phenotypes: NonNullable<NonNullable<StrainQuery["strain"]>["phenotypes"]>
}

const byPhenotype: Ord<Pick<Phenotype, "phenotype">> = pipe(
  sOrd,
  contramap((phenotype) => phenotype.phenotype),
)

const useStyles = makeStyles({
  paper: {
    // minHeight: 600,
    width: "100%",
  },
})
/**
 * PhenotypeList provides a list of phenotypes for a given strain.
 */

const ExistingPhenotypeList = ({ phenotypes }: Properties) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <ExistingPhenotypeListHeader />
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
