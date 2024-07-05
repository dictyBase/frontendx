import { useNavigate } from "react-router-dom"
import { Button } from "@material-ui/core"
import PersonIcon from "@material-ui/icons/Person"
import { ActionBar } from "@dictybase/ui-common"
import { Editor } from "@dictybase/editor"
import { type ContentBySlugQuery } from "dicty-graphql-schema"
import { UpdateButton } from "./UpdateButton"
import { timeSince } from "../timeSince"

type EditActionBarProperties = {
  fullName: string
  updatedAt: string
  contentId: string
}

const EditActionBar = ({
  contentId,
  fullName,
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
            <PersonIcon /> {fullName}
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
  const fullName = `${updated_by.first_name} ${updated_by.last_name}`
  return (
    <Editor
      content={{ storageKey: undefined, editorState: content }}
      editable
      toolbar={
        <EditActionBar
          contentId={id}
          updatedAt={updated_at}
          fullName={fullName}
        />
      }
    />
  )
}

export { EditView }
