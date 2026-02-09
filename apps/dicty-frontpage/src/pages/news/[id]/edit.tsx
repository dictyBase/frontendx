import { Grid, Container, Typography } from "@mui/material";
import { makeStyles } from 'tss-react/mui';
import {
  useContentBySlugQuery,
  User,
  UpdateContentMutation,
} from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { pipe } from "fp-ts/function"
import { parseISO, format, formatDistance } from "date-fns/fp"
import {
  FullPageLoadingDisplay,
  ActionBar,
  CopyLinkButton,
  BrowseNewsButton,
  PendingChanges,
  WaitingChanges,
  ProgressSaved,
  ExitEditingButton,
  SavingError,
} from "@dictybase/ui-common"
import { ACCESS } from "@dictybase/auth-mui5"
import { Editor } from "@dictybase/editor"
import { ApolloError } from "@apollo/client"
import PersonIcon from "@mui/icons-material/Person"
import { ErrorPageWrapper } from "../../../common/components/errors/ErrorPageWrapper"
import { useSlug } from "../../../common/hooks/useSlug"
import { NEWS_NAMESPACE } from "../../../common/constants/namespace"
import { UpdateButton } from "../../../common/components/UpdateButton"
import { truncateEmail } from "../../../common/utils/truncateEmail"
import { useAutoSave } from "../../../common/hooks/useAutoSave"

const useStyles = makeStyles()((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}));

type EditActionBarProperties = {
  contentId: string
  editedBy: string
  updatedAt: string
  autosaveState: {
    waiting: boolean
    loading: boolean
    error: ApolloError | undefined
    data: UpdateContentMutation | null | undefined
  }
}

const EditActionBar = ({
  contentId,
  editedBy,
  updatedAt,
  autosaveState,
}: EditActionBarProperties) => (
  <ActionBar
    descriptionElement={
      <>
        <strong>
          <PersonIcon /> {editedBy}
        </strong>{" "}
        updated {formatDistance(new Date(updatedAt), new Date())} ago
      </>
    }>
    {match(autosaveState)
      .with(
        {
          data: { updateContent: { content: P.string } },
        },
        () => <ProgressSaved />,
      )
      .with({ waiting: true }, () => <WaitingChanges />)
      .with({ loading: true }, () => <PendingChanges />)
      .with({ error: P.not(undefined) }, () => <SavingError />)
      .otherwise(() => (
        <></>
      ))}
    <UpdateButton contentId={contentId} canSave={autosaveState.waiting} />
    <ExitEditingButton />
  </ActionBar>
)

type EditViewProperties = {
  content: string
  contentId: string
  createdAt: string
  updatedBy: Pick<User, "email">
  updatedAt: string
}

const EditView = ({
  contentId,
  content,
  createdAt,
  updatedBy,
  updatedAt,
}: EditViewProperties) => {
  const [handleChange, autosaveState] = useAutoSave({
    contentId,
  })
  const { classes } = useStyles()
  const lastEditor = truncateEmail(updatedBy.email)
  const toolbar = (
    <EditActionBar
      contentId={contentId}
      editedBy={lastEditor}
      updatedAt={updatedAt}
      autosaveState={autosaveState}
    />
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
            handleChange={handleChange}
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
      ({ id, content, created_at, updated_by, updated_at }) => (
        <EditView
          contentId={id}
          content={content}
          createdAt={created_at}
          updatedBy={updated_by}
          updatedAt={updated_at}
        />
      ),
    )
    .with({ loading: true }, () => <FullPageLoadingDisplay />)
    .with({ error: P.select(P.not(undefined)) }, (error) => (
      <ErrorPageWrapper error={error} />
    ))
    .otherwise(() => <> This message should not appear. </>)
}
// eslint-disable-next-line import/no-default-export
export default Edit
export { EditView }
export const roles = ["content-admin"]
export const access = ACCESS.private
