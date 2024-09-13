import {
  PhenotypeInputPanel,
  PhenotypesLoader,
  NoStrainSelected,
  selectedStrainIdAtom,
} from "@dictybase/ui-dsc"
import { pipe } from "fp-ts/function"
import { match as Omatch } from "fp-ts/Option"
import { useAtomValue } from "jotai"
import { Grid } from "@material-ui/core"

const AddPhenotypePage = () => {
  const selectedStrain = useAtomValue(selectedStrainIdAtom)
  return (
    <Grid spacing={3} container>
      <Grid sm={3} xl={3} item>
        <PhenotypeInputPanel />
      </Grid>
      <Grid sm={9} xl={9} item>
        {pipe(
          selectedStrain,
          Omatch(
            () => <NoStrainSelected />,
            (id) => <PhenotypesLoader strainId={id} />,
          ),
        )}
      </Grid>
    </Grid>
  )
}

// eslint-disable-next-line import/no-default-export
export default AddPhenotypePage
