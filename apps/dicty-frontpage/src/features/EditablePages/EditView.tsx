import { useNavigate } from "react-router-dom"
import { Button } from "@material-ui/core"
import PersonIcon from "@material-ui/icons/Person"
import { ActionBar } from "@dictybase/ui-common"
import { Editor, EditorContainer } from "@dictybase/editor"
import { type ContentBySlugQuery } from "dicty-graphql-schema"
import { UpdateButton } from "../../common/components/UpdateButton"
import { timeSince } from "../../common/utils/timeSince"
import { truncateEmail } from "../../common/utils/truncateEmail"

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
  const { id, updated_at, updated_by, content } = data
  const editedBy = truncateEmail(updated_by.email)
  return (
    <EditorContainer>
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
    </EditorContainer>
  )
}

export { EditView }
