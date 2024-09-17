import { Grid } from "@material-ui/core"
import { usePublicationLazyQuery } from "dicty-graphql-schema"
import { useFormContext } from "react-hook-form"
import { PhenotypeReferenceField } from "./PhenotypeReferenceField"
import { PhenotypeReferenceDetails } from "./PhenotypeReferenceDetails"

const PhenotypeReferencePanel = () => {
  const { getValues, setValue } = useFormContext()
  const [getPublication, result] = usePublicationLazyQuery()

  const onClick = () => {
    getPublication(getValues("publication"))
  }
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <PhenotypeReferenceField onClick={onClick} />
      </Grid>
      <Grid item>
        <PhenotypeReferenceDetails result={result} />
      </Grid>
    </Grid>
  )
}

export { PhenotypeReferencePanel }
