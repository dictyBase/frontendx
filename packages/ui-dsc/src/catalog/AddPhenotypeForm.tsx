import {
  Container,
  Grid,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core"
import { FormProvider, SubmitHandler } from "react-hook-form"
import { InferType } from "yup"
import { AddPhenotypeFormContent } from "./AddPhenotypeFormContent"
import { usePhenotypeValidation } from "./usePhenotypeValidation"

const useStyles = makeStyles({
  root: {
    paddingTop: "1rem",
    paddingBottom: "1rem",
  },
})

const AddPhenotypeForm = () => {
  const { root } = useStyles()
  const { methods, schemaValidation } = usePhenotypeValidation()

  const onSubmit: SubmitHandler<InferType<typeof schemaValidation>> = (
    data,
  ) => {
    console.log(data)
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
                variant="contained"
                color="primary"
                disabled={!methods.formState.isValid}
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
