import { useState } from "react"
import {
  makeStyles,
  Grid,
  Container,
  Typography,
  Snackbar,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useContentBySlugQuery, User } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { pipe } from "fp-ts/function"
import { Option, some, none } from "fp-ts/Option"
import { parseISO, format } from "date-fns/fp"
import {
  FullPageLoadingDisplay,
  GraphQLErrorPage,
  ActionBar,
  CopyLinkButton,
  BrowseNewsButton,
} from "@dictybase/ui-common"
import { ACCESS } from "@dictybase/auth"
import { Editor } from "@dictybase/editor"
import { useConfirmNavigation } from "@dictybase/hook"
import { useSlug } from "../../../common/hooks/useSlug"
import { NEWS_NAMESPACE } from "../../../common/constants/namespace"
import { UpdateButton } from "../../../common/components/UpdateButton"
import { useAutoSave } from "../../../common/hooks/useAutoSave"

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}))

type EditActionBarProperties = {
  contentId: string
  lastEditor: string
}

const EditActionBar = ({ contentId, lastEditor }: EditActionBarProperties) => {
  const [isOpen, setIsOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<Option<string>>(none)

  const handleClose = () => {
    setIsOpen(false)
    setErrorMessage(none)
  }

  useAutoSave({
    contentId,
    onError: (error) => {
      setErrorMessage(some(error.message))
      setIsOpen(true)
    },
    onSuccess: () => {
      setErrorMessage(none)
      setIsOpen(true)
    },
  })

  return (
    <ActionBar
      descriptionElement={
        <Typography>Last updated by {lastEditor}</Typography>
      }>
      <UpdateButton contentId={contentId} />
      <Snackbar open={isOpen} onClose={handleClose} autoHideDuration={3000}>
        {match(errorMessage)
          .with(P.string, () => (
            <Alert severity="error"> Could not autosave progress. </Alert>
          ))
          .otherwise(() => (
            <Alert severity="success"> Work Saved. </Alert>
          ))}
      </Snackbar>
    </ActionBar>
  )
}

type EditViewProperties = {
  content: string
  contentId: string
  createdAt: string
  updatedBy: Pick<User, "email">
}

const EditView = ({
  contentId,
  content,
  createdAt,
  updatedBy,
}: EditViewProperties) => {
  const classes = useStyles()
  useConfirmNavigation()
  const lastEditor = updatedBy.email
  const toolbar = (
    <EditActionBar contentId={contentId} lastEditor={lastEditor} />
  )
  return (
    <Container className={classes.container}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid spacing={1} container alignItems="baseline">
            <Grid item>
              <Typography variant="h2">
                {pipe(createdAt, parseISO, format("PPPP"))}
              </Typography>
            </Grid>
            <Grid item>
              <CopyLinkButton />
            </Grid>
            <Grid item>
              <BrowseNewsButton />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Editor
            content={{ storageKey: undefined, editorState: content }}
            editable
            toolbar={toolbar}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

const Edit = () => {
  const slug = useSlug()
  const result = useContentBySlugQuery({
    variables: { slug: `${NEWS_NAMESPACE}-${slug}` },
    errorPolicy: "none",
  })
  return match(result)
    .with(
      { data: { contentBySlug: P.select({ content: P.string }) } },
      ({ id, content, created_at, updated_by }) => (
        <EditView
          contentId={id}
          content={content}
          createdAt={created_at}
          updatedBy={updated_by}
        />
      ),
    )
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ error: P.select(P.not(undefined)) }, (error) => (
      <GraphQLErrorPage error={error} />
    ))
    .otherwise(() => <> This message should not appear. </>)
}
// eslint-disable-next-line import/no-default-export
export default Edit
export { EditView }
export const roles = ["content-admin"]
export const access = ACCESS.private
