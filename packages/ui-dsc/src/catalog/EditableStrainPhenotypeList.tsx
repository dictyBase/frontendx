import { useState } from "react"
import { Ord as sOrd } from "fp-ts/string"
import { pipe } from "fp-ts/function"
import { contramap, Ord } from "fp-ts/lib/Ord"
import { sort, map } from "fp-ts/Array"
import { Grid, Paper, Button, Dialog } from "@material-ui/core"
import ControlPointIcon from "@material-ui/icons/ControlPoint"
import { Phenotype } from "dicty-graphql-schema"
import { StrainPhenotypeListHeader } from "./StrainPhenotypeListHeader"
import { StrainPhenotypeListItem } from "./StrainPhenotypeListItem"
import { AddPhenotypeForm } from "./AddPhenotypeForm"
import { useStyles } from "./phenotypeStyles"

type Properties = {
  strainId: string
  phenotypes: Array<Phenotype>
}

const byPhenotype: Ord<Phenotype> = pipe(
  sOrd,
  contramap((phenotype) => phenotype.phenotype),
)

/**
 * PhenotypeList provides a list of phenotypes for a given strain.
 */

const EditableStrainPhenotypeList = ({ strainId, phenotypes }: Properties) => {
  const [isOpen, setIsOpen] = useState(false)
  const classes = useStyles()
  const handleClick = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }
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
      <Grid container className={classes.bottom}>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            startIcon={<ControlPointIcon />}
            onClick={handleClick}>
            Add Phenotype
          </Button>
        </Grid>
      </Grid>
      <Dialog open={isOpen} onClose={handleClose}>
        <AddPhenotypeForm setOpen={setIsOpen} strainId={strainId} />
      </Dialog>
    </Paper>
  )
}

export { EditableStrainPhenotypeList }
