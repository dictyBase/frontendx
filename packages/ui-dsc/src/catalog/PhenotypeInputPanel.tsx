import {
  Paper,
  Container,
  Grid,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core"
import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { object, string, InferType } from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { StrainAutocomplete } from "./StrainAutocomplete"
import { PhenotypeAutocomplete } from "./PhenotypeAutocomplete"
import { EnvironmentAutocomplete } from "./EnvironmentAutocomplete"
import { AssayAutocomplete } from "./AssayAutocomplete"
import { PhenotypeNotesField } from "./PhenotypeNotesField"

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
  publication: string().required("* Publication is required"),
  notes: string(),
})

const PhenotypeInputPanel = () => {
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(schemaValidation),
    defaultValues: {
      phenotype: "",
      environment: "",
      assay: "",
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
      <Paper elevation={3} className={root}>
        <Container>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h3"> Add Phenotype </Typography>
            </Grid>
            <Grid item>
              <StrainAutocomplete />
            </Grid>
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
        </Container>
      </Paper>
    </FormProvider>
  )
}

export { PhenotypeInputPanel }
