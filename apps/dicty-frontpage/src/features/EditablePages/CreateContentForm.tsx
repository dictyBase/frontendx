import { FunctionComponent } from "react"
import { pipe } from "fp-ts/function"
import { isEmpty as SisEmpty } from "fp-ts/string"
import { match as Bmatch, MonoidAny } from "fp-ts/boolean"
import {
  Button,
  TextField,
  Container,
  Paper,
  Grid,
  makeStyles,
  CircularProgress,
} from "@material-ui/core"
import { InferType } from "yup"
import { FormProvider, SubmitHandler } from "react-hook-form"
import { SectionSelect } from "./SectionSelect"
import {
  useCreateContentForm,
  validationSchema,
  useAvailableContentSlugValidation,
} from "../../common/hooks/useCreateContentForm"
import { getCreateContentSlug } from "../../common/utils/getCreateContentSlug"
import { matchContentNamespace } from "../../common/utils/matchContentNamespace"
import { useCreateContentFromEditor } from "../../common/hooks/useCreateContentFromEditor"

const useStyles = makeStyles({
  root: {
    padding: "0.5rem",
  },
  grid: {
    alignContent: "baseline",
  },
})

const CreateContentForm: FunctionComponent = () => {
  const { root } = useStyles()
  const checkAvailable = useAvailableContentSlugValidation()
  const createContent = useCreateContentFromEditor()
  const methods = useCreateContentForm()
  const {
    formState: { errors, isValid, isSubmitting },
  } = methods
  const sectionValue = methods.watch("section")
  const nameValue = methods.watch("name")
  const subnameDisabled = MonoidAny.concat(
    SisEmpty(sectionValue),
    SisEmpty(nameValue),
  )
  const buttonLoading = pipe(
    isSubmitting,
    Bmatch(
      () => <></>,
      () => <CircularProgress size={20} color="secondary" />,
    ),
  )
  const onSubmit: SubmitHandler<InferType<typeof validationSchema>> = async ({
    section,
    name,
    subname,
  }) => {
    const namespace = matchContentNamespace(section)
    const slug = getCreateContentSlug({ name, subname })
    const { isAvailable } = await checkAvailable(namespace, slug)
    pipe(
      isAvailable,
      Bmatch(
        () => {
          createContent(namespace, slug)
        },
        () => {},
      ),
    )
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
                startIcon={buttonLoading}
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
