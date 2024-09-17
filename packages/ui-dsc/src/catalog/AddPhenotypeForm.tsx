import {
  Container,
  Grid,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core"
import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { object, boolean, string, InferType } from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { PhenotypeAutocomplete } from "./PhenotypeAutocomplete"
import { EnvironmentAutocomplete } from "./EnvironmentAutocomplete"
import { AssayAutocomplete } from "./AssayAutocomplete"
import { PhenotypeNotesField } from "./PhenotypeNotesField"
import { PhenotypeReferencePanel } from "./PhenotypeReferencePanel"

const useStyles = makeStyles({
  root: {
    paddingTop: "1rem",
    paddingBottom: "1rem",
  },
})

const schemaValidation = object().shape({
  phenotype: string().required("* Phenotype is required"),
  environment: string(),
  assay: string(),
  hasPublication: boolean(),
  publication: string().required("* Reference Publication is required"),
  note: string(),
})

const AddPhenotypeForm = () => {
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(schemaValidation),
    defaultValues: {
      phenotype: "",
      environment: "",
      assay: "",
      publication: "",
      hasPublication: false,
      note: "",
    },
  })
  const { root } = useStyles()
  const onSubmit: SubmitHandler<InferType<typeof schemaValidation>> = (
    data,
  ) => {
    console.log("submit")
    console.log(data)
  }
  const onClick = () => {
    console.log(methods.getValues())
  }
  return (
    <FormProvider {...methods}>
      <Container className={root}>
        <Typography variant="h3"> Add Phenotype </Typography>
        <Grid container direction="row" spacing={2} wrap="nowrap">
          <Grid item>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <PhenotypeAutocomplete />
              </Grid>
              <Grid item>
                <EnvironmentAutocomplete />
              </Grid>
              <Grid item>
                <AssayAutocomplete />
              </Grid>
              <Grid item>
                <PhenotypeNotesField />
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={onClick}>
                  Add
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <PhenotypeReferencePanel />
          </Grid>
        </Grid>
      </Container>
    </FormProvider>
  )
}

export { AddPhenotypeForm }
