import { FunctionComponent } from "react"
import { isEmpty as SisEmpty } from "fp-ts/string"
import { MonoidAny } from "fp-ts/boolean"
import {
  Button,
  TextField,
  Container,
  Paper,
  Grid,
  makeStyles,
} from "@material-ui/core"
import { yupResolver } from "@hookform/resolvers/yup"
import { object, string, InferType } from "yup"
import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { SectionSelect } from "./SectionSelect"
import { getCreateContentSlug } from "../../common/utils/getCreateContentSlug"

const useStyles = makeStyles({
  root: {
    padding: "0.5rem",
  },
  grid: {
    alignContent: "baseline",
  },
})

const validationSchema = object()
  .shape({
    section: string().required("* Section is required"),
    name: string().required("* Name is required"),
    subname: string(),
  })
  .test("createContentPage", "Content already exists", async (data) => {
    const slug = getCreateContentSlug(data)
    console.log(slug)
    return !!slug
  })

const CreateContentForm: FunctionComponent = () => {
  const { root } = useStyles()
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: { section: "", name: "", subname: "" },
  })
  const {
    formState: { errors, isValid },
  } = methods
  const sectionValue = methods.watch("section")

  const nameValue = methods.watch("name")
  const subnameDisabled = MonoidAny.concat(
    SisEmpty(sectionValue),
    SisEmpty(nameValue),
  )
  const onSubmit: SubmitHandler<InferType<typeof validationSchema>> = (
    data,
  ) => {
    console.log(data)
    console.log("submit success")
  }

  return (
    <FormProvider {...methods}>
      <Container>
        <Paper className={root}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SectionSelect />
            </Grid>
            <Grid item>
              <TextField
                {...methods.register("name")}
                error={!!errors.name}
                label="* Name"
                name="name"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                {...methods.register("subname")}
                label="Subname"
                name="subname"
                variant="outlined"
                disabled={subnameDisabled}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                disabled={!isValid}
                onClick={methods.handleSubmit(onSubmit)}>
                Create
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={methods.handleSubmit(onSubmit)}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </FormProvider>
  )
}

export { CreateContentForm }
