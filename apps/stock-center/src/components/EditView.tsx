import { useCallback, useState } from "react"
import { ApolloError } from "@apollo/client"
import { EditorState } from "lexical"
import { Container } from "@mui/material"
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
import { UpdateButton } from "./UpdateButton"
import { truncateEmail } from "../truncateEmail"
import { useAutoSave } from "../hooks/useAutoSave"

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

const EditViewContent = ({ data }: EditViewProperties) => {
  const { id, updated_at, updated_by, content } = data
  const [handleAutoSave, autosaveState] = useAutoSave({
    contentId: id,
  })
  const [hasLocalEdits, setHasLocalEdits] = useState(false)
  const [editorContent, setEditorContent] = useState(content)

  // The Editor remounts whenever initialState changes. Follow server refreshes
  // (e.g. cache-and-network) until the user edits; after that the editor is the
  // source of truth, so saved content echoed back through the Apollo cache must
  // not remount it and steal focus/selection.
  if (!hasLocalEdits && content !== editorContent) {
    setEditorContent(content)
  }

  const handleChange = useCallback(
    (editorState: EditorState) => {
      setHasLocalEdits(true)
      handleAutoSave(editorState)
    },
    [handleAutoSave],
  )

  const editedBy = truncateEmail(updated_by.email)
  return (
    <Container sx={{ marginTop: 2, marginBottom: 4 }}>
      <Editor
        initialState={editorContent}
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

// Keyed by id so switching to another document starts a fresh edit session.
const EditView = ({ data }: EditViewProperties) => (
  <EditViewContent key={data.id} data={data} />
)

export { EditView }
