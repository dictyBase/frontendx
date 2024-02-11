import { Container } from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import { type ContentBySlugQuery } from "dicty-graphql-schema"
import { Editor } from "editor"

type ContentViewProperties = {
  data: NonNullable<ContentBySlugQuery["contentBySlug"]>
}

const EditView = ({ data }: ContentViewProperties) => {
  const navigate = useNavigate()
  const onSave = async () => {
    // update content mutation
    navigate("../editable", { relative: "path" })
  }
  const onCancel = () => {
    navigate("../editable", { relative: "path" })
  }

  return (
    <Container>
      <Editor
        handleSave={onSave}
        handleCancel={onCancel}
        editable
        content={{ storageKey: data.slug, editorState: data.content }}
      />
    </Container>
  )
}

export { EditView }
