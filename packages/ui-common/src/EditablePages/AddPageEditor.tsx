import { useNavigate } from "react-router-dom"
import {
  useCreateContentMutation,
  useUploadFileMutation,
} from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import { match as Omatch, fromNullable as OfromNullable } from "fp-ts/Option"
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
  const [uploadImage] = useUploadFileMutation({
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

  const onImageUpload = async (file: File) => {
    const { data: uploadData } = await uploadImage({ variables: { file } })
    return pipe(
      uploadData,
      OfromNullable,
      Omatch(
        () => "",
        ({ uploadFile }) => uploadFile.url,
      ),
    )
  }

  const handleCancelClick = () => {
    navigate("../notfoundauth", { relative: "path" })
  }

  return (
    <Editor
      toolbar={createAddPageToolbar(contentPath)}
      handleSave={handleSaveClick}
      handleCancel={handleCancelClick}
      handleImageUpload={onImageUpload}
      editable
    />
  )
}

export { AddPageEditor }
