import { Dispatch, SetStateAction } from "react"
import {
  Container,
  Grid,
  Button,
  Typography,
  makeStyles,
  CircularProgress,
} from "@material-ui/core"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { FormProvider, SubmitHandler } from "react-hook-form"
import { useAddStrainPhenotypeMutation } from "dicty-graphql-schema"
import { Strain } from "dicty-graphql-schema/types/query"
import { InferType } from "yup"
import { AddPhenotypeFormContent } from "./AddPhenotypeFormContent"
import { usePhenotypeValidation } from "./usePhenotypeValidation"

type AddPhenotypeFormProperties = {
  strainId: string
  setOpen: Dispatch<SetStateAction<boolean>>
}

const useStyles = makeStyles({
  root: {
    paddingTop: "1rem",
    paddingBottom: "1rem",
  },
})

const AddPhenotypeForm = ({
  strainId,
  setOpen,
}: AddPhenotypeFormProperties) => {
  const { root } = useStyles()
  const { methods, schemaValidation } = usePhenotypeValidation()
  const [addPhenotype] = useAddStrainPhenotypeMutation({
    refetchQueries: [Strain],
  })

  const disableSubmit =
    !methods.formState.isValid || methods.formState.isSubmitting

  const buttonStartIcon = pipe(
    methods.formState.isSubmitting,
    Bmatch(
      () => <></>,
      () => <CircularProgress size={20} color="secondary" />,
    ),
  )

  const onSubmit: SubmitHandler<InferType<typeof schemaValidation>> = async (
    data,
  ) => {
    await addPhenotype({ variables: { strainId, input: data } })
    setOpen(false)
  }

  return (
    <FormProvider {...methods}>
      <Container className={root}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography variant="h3"> Add Phenotype </Typography>
          </Grid>
          <Grid item>
            <AddPhenotypeFormContent />
          </Grid>
          <Grid item>
            <Grid container justifyContent="flex-end">
              <Button
                startIcon={buttonStartIcon}
                variant="contained"
                color="primary"
                disabled={disableSubmit}
                onClick={methods.handleSubmit(onSubmit)}>
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </FormProvider>
  )
}

export { AddPhenotypeForm }
