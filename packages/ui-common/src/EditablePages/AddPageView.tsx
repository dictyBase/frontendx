import { useNavigate } from "react-router-dom"
import { Container } from "@material-ui/core"
import { useCreateContentMutation } from "dicty-graphql-schema"
import { Editor } from "editor"
import { createAddPageToolbar } from "./createAddPageToolbar"

type AddPageViewProperties = {
  userId: string
  token: string
  namespace: string
  slug: string
  contentPath: string
}

/**
 * This is the view component so an authorized user can add a new page.
 */
const AddPageView = ({
  userId,
  token,
  namespace,
  slug,
  contentPath,
}: AddPageViewProperties) => {
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
    <Container>
      <Editor
        toolbar={createAddPageToolbar(contentPath)}
        handleSave={handleSaveClick}
        handleCancel={handleCancelClick}
        editable
      />
    </Container>
  )
}

export { AddPageView }
