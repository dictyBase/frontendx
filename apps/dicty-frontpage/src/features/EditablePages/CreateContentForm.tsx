import { FunctionComponent } from "react"
import { pipe } from "fp-ts/function"
import { useNavigate } from "react-router-dom"
import { isEmpty as SisEmpty } from "fp-ts/string"
import { match as Bmatch, MonoidAny } from "fp-ts/boolean"
import { match as Ematch } from "fp-ts/Either"
import { match, P } from "ts-pattern"
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
  const navigate = useNavigate()
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
    const mutationState = await createContent(namespace, slug)
    pipe(
      mutationState,
      Ematch(
        ({ message }) => {},
        () => {
          navigate(`/${section}/${name}/${subname}/editable`)
        },
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
                helperText={errors.name?.message}
                label="* Name"
                name="name"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                {...methods.register("subname")}
                error={!!errors.subname}
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
