import { useState } from "react"
import { pipe } from "fp-ts/function"
import { useNavigate } from "react-router-dom"
import { match as Ematch } from "fp-ts/Either"
import { match, P } from "ts-pattern"
import { Container, Paper, Grid, makeStyles } from "@material-ui/core"
import { InferType } from "yup"
import { FormProvider, SubmitHandler } from "react-hook-form"
import { ErrorSnackbar } from "@dictybase/ui-common"
import { ContentPathInputs } from "./ContentPathInputs"
import { CreateContentFormButtons } from "./CreateContentFormButtons"
import { useCreateContentForm, validationSchema } from "../useCreateContentForm"
import { useCreateContentFromEditor } from "../useCreateContentFromEditor"
import { getCreateContentSlug } from "../getCreateContentSlug"
import { getPagePath } from "../getPagePath"
import { matchContentNamespace } from "../matchContentNamespace"
import { getGraphqlErrorCode, mapCodeToMessage } from "../getGraphqlErrorCode"

const useStyles = makeStyles({
  root: {
    padding: "0.5rem",
  },
})

const CreateContentForm = () => {
  const [open, setOpen] = useState(false)
  const [createContentError, setCreateContentError] = useState("")
  const { root } = useStyles()
  const navigate = useNavigate()
  const createContent = useCreateContentFromEditor()
  const methods = useCreateContentForm()

  const onSubmit: SubmitHandler<InferType<typeof validationSchema>> = async ({
    section,
    name,
    subname,
  }) => {
    const namespace = matchContentNamespace(section)
    const slug = getCreateContentSlug({ name, subname })
    const eitherMutation = await createContent(namespace, slug)
    pipe(
      eitherMutation,
      Ematch(
        ({ message }) => {
          setCreateContentError(message)
          setOpen(true)
        },
        (mutationState) => {
          match(mutationState)
            .with(
              {
                data: { createContent: P.select({ content: P.string }) },
              },
              () => {
                navigate(`/${getPagePath(section, name, subname)}/editable`)
              },
            )
            .with({ errors: P.select(P.not(undefined)) }, (graphQLErrors) => {
              pipe(
                graphQLErrors,
                getGraphqlErrorCode,
                mapCodeToMessage,
                setCreateContentError,
              )
              setOpen(true)
            })
            .otherwise(() => {})
        },
      ),
    )
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onCancel = () => {
    navigate("/")
  }

  return (
    <FormProvider {...methods}>
      <Container>
        <Paper className={root}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <ContentPathInputs />
            </Grid>
            <Grid item>
              <CreateContentFormButtons
                onSubmit={onSubmit}
                onCancel={onCancel}
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <ErrorSnackbar
        open={open}
        handleClose={handleClose}
        message={createContentError}
      />
    </FormProvider>
  )
}

export { CreateContentForm }
