import { makeStyles, Container } from "@material-ui/core"
import PersonIcon from "@material-ui/icons/Person"
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
import { type ContentBySlugQuery } from "dicty-graphql-schema"
import { UpdateButton } from "../../common/components/UpdateButton"
import { truncateEmail } from "../../common/utils/truncateEmail"
import { useAutoSave } from "../../common/hooks/useAutoSave"

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}))

type EditActionBarProperties = {
  contentId: string
  editedBy: string
  updatedAt: string
}

const EditActionBar = ({
  contentId,
  editedBy,
  updatedAt,
}: EditActionBarProperties) => {
  const autosaveStates = useAutoSave({
    contentId,
  })

  return (
    <ActionBar
      descriptionElement={
        <>
          <strong>
            <PersonIcon /> {editedBy}
          </strong>{" "}
          updated {formatDistance(new Date(updatedAt), new Date())} ago
        </>
      }>
      {match(autosaveStates)
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
      <UpdateButton contentId={contentId} canSave={false} />
      <ExitEditingButton />
    </ActionBar>
  )
}

type EditViewProperties = {
  data: NonNullable<ContentBySlugQuery["contentBySlug"]>
}

const EditView = ({ data }: EditViewProperties) => {
  const classes = useStyles()
  const { id, updated_at, updated_by, content } = data
  const editedBy = truncateEmail(updated_by.email)
  return (
    <Container className={classes.container}>
      <Editor
        content={{ storageKey: undefined, editorState: content }}
        editable
        toolbar={
          <EditActionBar
            contentId={id}
            updatedAt={updated_at}
            editedBy={editedBy}
          />
        }
      />
    </Container>
  )
}

export { EditView }
