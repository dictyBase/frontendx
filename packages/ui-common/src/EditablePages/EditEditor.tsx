import { useNavigate } from "react-router-dom"
import {
  type ContentBySlugQuery,
  useUpdateContentMutation,
} from "dicty-graphql-schema"
import { Editor } from "editor"
import { createToolbarWrapper } from "./createToolbarWrapper"

type EditEditorProperties = {
  data: NonNullable<ContentBySlugQuery["contentBySlug"]>
  userId: string
  token: string
}

const EditEditor = ({ data, userId, token }: EditEditorProperties) => {
  const { id, updated_by, updated_at, slug, content } = data
  const [updateContent] = useUpdateContentMutation({
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
  const navigate = useNavigate()
  const onSave = async (contentValue: string) => {
    try {
      await updateContent({
        variables: {
          input: {
            id,
            updated_by: userId,
            content: contentValue,
          },
        },
      })
      navigate("../editable", { relative: "path" })
    } catch {
      // Toggle some error notification
    }
  }
  const onCancel = () => {
    navigate("../editable", { relative: "path" })
  }

  const Toolbar = createToolbarWrapper(
    updated_at,
    updated_by.first_name,
    updated_by.last_name,
  )

  return (
    <Editor
      toolbar={Toolbar}
      handleSave={onSave}
      handleCancel={onCancel}
      editable
      content={{ storageKey: slug, editorState: content }}
    />
  )
}

export { EditEditor }
