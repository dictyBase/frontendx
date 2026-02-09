import { ApolloError } from "@apollo/client"
import { Container } from "@mui/material"
import { makeStyles } from "tss-react/mui"
import PersonIcon from "@mui/icons-material/Person"
import { formatDistance } from "date-fns"
import {
  ActionBar,
  PendingChanges,
  WaitingChanges,
  ProgressSaved,
  ExitEditingButton,
  SavingError,
} from "@dictybase/ui-common"
import { match, P } from "ts-pattern"
import { Editor } from "@dictybase/editor"
import {
  type ContentBySlugQuery,
  UpdateContentMutation,
} from "dicty-graphql-schema"
import { UpdateButton } from "../../common/components/UpdateButton"
import { truncateEmail } from "../../common/utils/truncateEmail"
import { useAutoSave } from "../../common/hooks/useAutoSave"

const useStyles = makeStyles()((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}))

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
  data: NonNullable<ContentBySlugQuery["contentBySlug"]>
}

const EditView = ({ data }: EditViewProperties) => {
  const { classes } = useStyles()
  const { id, updated_at, updated_by, content } = data
  const [handleChange, autosaveState] = useAutoSave({
    contentId: id,
  })

  const editedBy = truncateEmail(updated_by.email)
  return (
    <Container className={classes.container}>
      <Editor
        content={{ storageKey: undefined, editorState: content }}
        editable
        handleChange={handleChange}
        toolbar={
          <EditActionBar
            contentId={id}
            updatedAt={updated_at}
            editedBy={editedBy}
            autosaveState={autosaveState}
          />
        }
      />
    </Container>
  )
}

export { EditView }
