import { useNavigate } from "react-router-dom"
import { useCreateContentMutation } from "dicty-graphql-schema"
import { Editor } from "editor"
import { createAddPageToolbar } from "./createAddPageToolbar"

type AddPageEditorProperties = {
  userId: string
  token: string
  namespace: string
  slug: string
  contentPath: string
}

/**
 * This is the view component so an authorized user can add a new page.
 */
const AddPageEditor = ({
  userId,
  token,
  namespace,
  slug,
  contentPath,
}: AddPageEditorProperties) => {
  const navigate = useNavigate()
  const [createContent] = useCreateContentMutation({
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  const handleSaveClick = async (value: any) => {
    try {
      await createContent({
        variables: {
          input: {
            name: slug,
            // eslint-disable-next-line camelcase
            created_by: userId,
            content: value,
            namespace,
          },
        },
      })
      navigate("../editable", { relative: "path" })
    } catch {
      // Toggle some error notification
    }
  }

  const handleCancelClick = () => {
    navigate("../notfoundauth", { relative: "path" })
  }

  return (
    <Editor
      toolbar={createAddPageToolbar(contentPath)}
      handleSave={handleSaveClick}
      handleCancel={handleCancelClick}
      editable
    />
  )
}

export { AddPageEditor }
