import { useState, useEffect } from "react"
import { pipe } from "fp-ts/function"
import { useNavigate } from "react-router-dom"
import { match as Ematch } from "fp-ts/Either"
import { match, P } from "ts-pattern"
import { Container, Paper, Stack } from "@mui/material"
import { makeStyles } from "tss-react/mui"
import { InferType } from "yup"
import { FormProvider, SubmitHandler } from "react-hook-form"
import { ErrorSnackbar } from "@dictybase/ui-common"
import { ContentPathInputs } from "./ContentPathInputs"
import { CreateContentFormButtons } from "./CreateContentFormButtons"
import {
  useCreateContentForm,
  validationSchema,
} from "../../common/hooks/useCreateContentForm"
import { useCreateContentFromEditor } from "../../common/hooks/useCreateContentFromEditor"
import { getCreateContentSlug } from "../../common/utils/getCreateContentSlug"
import { getPagePath } from "../../common/utils/getPagePath"
import { matchContentNamespace } from "../../common/utils/matchContentNamespace"
import {
  getGraphqlErrorCode,
  mapCodeToMessage,
} from "../../common/utils/getGraphqlErrorCode"

const useStyles = makeStyles()((theme) => ({
  root: {
    padding: "0.5rem",
  },
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}))

const handler = (event: BeforeUnloadEvent) => {
  event.preventDefault()
}

const CreateContentForm = () => {
  const [open, setOpen] = useState(false)
  const [createContentError, setCreateContentError] = useState("")
  const {
    classes: { root, container },
  } = useStyles()
  const navigate = useNavigate()
  const createContent = useCreateContentFromEditor()
  const methods = useCreateContentForm()
  useEffect(() => {
    window.addEventListener("beforeunload", handler)
    return () => {
      window.removeEventListener("beforeunload", handler)
    }
  }, [])
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
      <Container className={container}>
        <Paper className={root}>
          <Stack direction="row" spacing={2} alignItems="center">
            <ContentPathInputs />
            <CreateContentFormButtons onSubmit={onSubmit} onCancel={onCancel} />
          </Stack>
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
