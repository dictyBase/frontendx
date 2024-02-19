/* eslint-disable camelcase */
import { Container } from "@material-ui/core"
import { type ContentBySlugQuery } from "dicty-graphql-schema"
import { Editor } from "editor"
import { useNavigate } from "react-router-dom"
import { EditContentToolbar } from "./EditContentToolbar"

type EditableViewProperties = {
  data: NonNullable<ContentBySlugQuery["contentBySlug"]>
}

const EditableView = ({ data }: EditableViewProperties) => {
  const navigate = useNavigate()
  const { updated_at, updated_by, content, slug } = data
  const handleClick = () => {
    navigate("../edit", { relative: "path" })
  }
  return (
    <Container>
      <EditContentToolbar
        user={updated_by}
        lastUpdate={updated_at}
        handleClick={handleClick}
      />
      <Editor
        editable={false}
        content={{ storageKey: slug, editorState: content }}
      />
    </Container>
  )
}

export { EditableView }
