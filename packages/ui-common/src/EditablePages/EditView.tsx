import { Container } from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import {
  type ContentBySlugQuery,
  useUpdateContentMutation,
} from "dicty-graphql-schema"
import { Editor } from "editor"

type ContentViewProperties = {
  data: NonNullable<ContentBySlugQuery["contentBySlug"]>
  userId: string
  token: string
}

const EditView = ({ data, userId, token }: ContentViewProperties) => {
  const [updateContent] = useUpdateContentMutation({
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
  const navigate = useNavigate()
  const onSave = async (value: any) => {
    try {
      await updateContent({
        variables: {
          input: {
            id: data.id,
            // eslint-disable-next-line camelcase
            updated_by: userId,
            content: value,
          },
        },
      })
      navigate("../editable", { relative: "path" })
    } catch (error) {
      console.error(error)
    }
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
