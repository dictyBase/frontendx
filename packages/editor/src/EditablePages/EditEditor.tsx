import { useNavigate } from "react-router-dom"
import {
  type ContentBySlugQuery,
  useUpdateContentMutation,
} from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import {
  Do as TEDo,
  let as TElet,
  bind as TEbind,
  tryCatch as TEtryCatch,
} from "fp-ts/TaskEither"
import { Editor } from "@dictybase/editor"
import { createToolbarWrapper } from "./createToolbarWrapper"

type EditEditorProperties = {
  data: NonNullable<ContentBySlugQuery["contentBySlug"]>
  userId: string
  getAccessToken: (resource?: string) => Promise<string | undefined>
}

enum ErrorType {
  ACCESS_TOKEN_ERROR,
  UPDATE_FAILURE,
}

const accessTokenError = {
  errorType: ErrorType.ACCESS_TOKEN_ERROR,
  message: "Could not get access token",
}

const updateFailureError = {
  errorType: ErrorType.UPDATE_FAILURE,
  message: "Could not update content",
}

const EditEditor = ({ data, userId, getAccessToken }: EditEditorProperties) => {
  const { id, updated_by, updated_at, slug, content } = data
  const [updateContent] = useUpdateContentMutation({
    context: {
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
      },
    },
  })
  const navigate = useNavigate()
  const onSave = async (contentValue: string) => {
    const updateTask = pipe(
      TEDo,
      TElet("updatedContent", () => contentValue),
      TEbind("token", () =>
        TEtryCatch(
          () =>
            getAccessToken(import.meta.env.VITE_APP_LOGTO_API_SECOND_RESOURCE),
          () => accessTokenError,
        ),
      ),
      TEbind("update", ({ updatedContent, token }) =>
        TEtryCatch(
          () =>
            updateContent({
              variables: {
                input: { id, updated_by: userId, content: updatedContent },
              },
              context: { headers: { Authorization: `Bearer ${token}` } },
            }),
          () => updateFailureError,
        ),
      ),
    )
    await updateTask()
    navigate("../editable", { relative: "path" })
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
