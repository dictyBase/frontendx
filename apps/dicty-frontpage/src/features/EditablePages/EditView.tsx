import { useState } from "react"
import { makeStyles, Container, Snackbar } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import PersonIcon from "@material-ui/icons/Person"
import { match, P } from "ts-pattern"
import { Option, some, none } from "fp-ts/Option"
import { ActionBar } from "@dictybase/ui-common"
import { Editor } from "@dictybase/editor"
import { useConfirmNavigation } from "@dictybase/hook"
import { type ContentBySlugQuery } from "dicty-graphql-schema"
import { UpdateButton } from "../../common/components/UpdateButton"
import { timeSince } from "../../common/utils/timeSince"
import { truncateEmail } from "../../common/utils/truncateEmail"
import { useAutoSave } from "../../common/hooks/useAutoSave"

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
}))

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
