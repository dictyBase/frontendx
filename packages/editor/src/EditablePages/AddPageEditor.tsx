import { useNavigate } from "react-router-dom"
import { useCreateContentMutation } from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import {
  Do as TEDo,
  let as TElet,
  bind as TEbind,
  tryCatch as TEtryCatch,
} from "fp-ts/TaskEither"
import { Editor } from "../Editor"
import { createAddPageToolbar } from "./createAddPageToolbar"

type AddPageEditorProperties = {
  userId: string
  getAccessToken: (resource?: string) => Promise<string | undefined>
  namespace: string
  slug: string
  contentPath: string
}

enum ErrorType {
  ACCESS_TOKEN_ERROR,
  CREATE_FAILURE,
}

const accessTokenError = {
  errorType: ErrorType.ACCESS_TOKEN_ERROR,
  message: "Could not get access token",
}

const createFailureError = {
  errorType: ErrorType.CREATE_FAILURE,
  message: "Could not create content",
}

/**
 * This is the view component so an authorized user can add a new page.
 */
const AddPageEditor = ({
  userId,
  getAccessToken,
  namespace,
  slug,
  contentPath,
}: AddPageEditorProperties) => {
  const navigate = useNavigate()
  const [createContent] = useCreateContentMutation()

  const handleSaveClick = async (contentValue: string) => {
    const createTask = pipe(
      TEDo,
      TElet("newContent", () => contentValue),
      TEbind("token", () =>
        TEtryCatch(
          () =>
            getAccessToken(import.meta.env.VITE_APP_LOGTO_API_SECOND_RESOURCE),
          () => accessTokenError,
        ),
      ),
      TEbind("create", ({ newContent, token }) =>
        TEtryCatch(
          () =>
            createContent({
              variables: {
                input: {
                  name: slug,
                  namespace,
                  created_by: userId,
                  content: newContent,
                },
              },
              context: { headers: { Authorization: `Bearer ${token}` } },
            }),
          () => createFailureError,
        ),
      ),
    )
    await createTask()
    navigate("../editable", { relative: "path" })
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
