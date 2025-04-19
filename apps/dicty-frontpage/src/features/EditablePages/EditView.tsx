import { useNavigate } from "react-router-dom"
import { makeStyles, Container, Button } from "@material-ui/core"
import PersonIcon from "@material-ui/icons/Person"
import { ActionBar } from "@dictybase/ui-common"
import { Editor } from "@dictybase/editor"
import { useConfirmNavigation } from "@dictybase/hook"
import { type ContentBySlugQuery } from "dicty-graphql-schema"
import { UpdateButton } from "../../common/components/UpdateButton"
import { timeSince } from "../../common/utils/timeSince"
import { truncateEmail } from "../../common/utils/truncateEmail"

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
  const navigate = useNavigate()
  const handleCancel = async () => {
    navigate("../editable", { relative: "path" })
  }
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
      <Button onClick={handleCancel}> Cancel </Button>
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
