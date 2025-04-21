import { Snackbar } from "@material-ui/core"
import PersonIcon from "@material-ui/icons/Person"
import { ActionBar } from "@dictybase/ui-common"
import { Editor } from "@dictybase/editor"
import { useConfirmNavigation } from "@dictybase/hook"
import { ContentBySlugQuery } from "dicty-graphql-schema"
import { useState } from "react"
import { Alert } from "@material-ui/lab"
import { pipe } from "fp-ts/function"
import { Option, some, none, match as Omatch } from "fp-ts/Option"
import { truncateEmail } from "../truncateEmail"
import { timeSince } from "../timeSince"
import { UpdateButton } from "./UpdateButton"
import { useAutoSave } from "../hooks/useAutoSave"

type EditActionBarProperties = {
  editedBy: string
  updatedAt: string
  contentId: string
}

const EditActionBar = ({
  contentId,
  editedBy,
  updatedAt,
}: EditActionBarProperties) => {
  useConfirmNavigation()
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
        <>
          <strong>
            <PersonIcon /> {editedBy}
          </strong>{" "}
          edited {timeSince(updatedAt)} ago
        </>
      }>
      <UpdateButton contentId={contentId} />
      <Snackbar open={isOpen} onClose={handleClose} autoHideDuration={3000}>
        {pipe(
          errorMessage,
          Omatch(
            () => <Alert severity="success"> Work Saved. </Alert>,
            () => (
              <Alert severity="error"> Could not autosave progress. </Alert>
            ),
          ),
        )}
      </Snackbar>
    </ActionBar>
  )
}

type EditViewProperties = {
  data: NonNullable<ContentBySlugQuery["contentBySlug"]>
}

const EditView = ({ data }: EditViewProperties) => {
  const { id, updated_at, updated_by, content } = data
  const editedBy = truncateEmail(updated_by.email)
  return (
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
  )
}

export { EditView }
