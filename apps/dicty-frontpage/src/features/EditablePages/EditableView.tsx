import { Container, Button } from "@material-ui/core"
import PersonIcon from "@material-ui/icons/Person"
import { useNavigate } from "react-router-dom"
import { type ContentBySlugQuery } from "dicty-graphql-schema"
import { Editor } from "@dictybase/editor"
import { ActionBar } from "@dictybase/ui-common"
import { timeSince } from "../../common/utils/timeSince"

type EditableActionBarProperties = {
  fullName: string
  updatedAt: string
}

const EditableActionBar = ({
  fullName,
  updatedAt,
}: EditableActionBarProperties) => {
  const navigate = useNavigate()
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("../edit", { relative: "path" })}>
        Edit
      </Button>
    </ActionBar>
  )
}

type EditableViewProperties = {
  data: NonNullable<ContentBySlugQuery["contentBySlug"]>
}

const EditableView = ({ data }: EditableViewProperties) => {
  const { updated_at, updated_by, content, slug } = data
  const fullName = `${updated_by.first_name} ${updated_by.last_name}`

  return (
    <Container>
      <Editor
        toolbar={
          <EditableActionBar fullName={fullName} updatedAt={updated_at} />
        }
        editable={false}
        content={{ storageKey: slug, editorState: content }}
      />
    </Container>
  )
}

export { EditableView }
