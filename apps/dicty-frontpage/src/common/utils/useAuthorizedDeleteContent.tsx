import { pipe } from "fp-ts/function"
import { useLogto } from "@logto/react"
import { useDeleteContentMutation } from "dicty-graphql-schema"
import {
  Do as TEDo,
  bind as TEbind,
  tryCatch as TEtryCatch,
  map as TEmap,
} from "fp-ts/TaskEither"

enum ErrorType {
  ACCESS_TOKEN_ERROR,
  DELETE_FAILURE,
}

const accessTokenError = {
  errorType: ErrorType.ACCESS_TOKEN_ERROR,
  message: "Could not get access token",
}

const deleteFailureError = {
  errorType: ErrorType.DELETE_FAILURE,
  message: "Could not update content",
}

const useAuthorizedUpdateContent = (contentId: string) => {
  const { getAccessToken } = useLogto()
  const [deleteContent] = useDeleteContentMutation()

  return () => {
    const task = pipe(
      TEDo,
      TEbind("token", () =>
        TEtryCatch(
          () =>
            getAccessToken(import.meta.env.VITE_APP_LOGTO_API_SECOND_RESOURCE),
          () => accessTokenError,
        ),
      ),
      TEbind("deleted", ({ token }) =>
        TEtryCatch(
          () =>
            deleteContent({
              variables: {
                id: contentId,
              },
              context: { headers: { Authorization: `Bearer ${token}` } },
            }),
          () => deleteFailureError,
        ),
      ),
      TEmap(({ deleted }) => deleted),
    )
    return task()
  }
}

export { useAuthorizedUpdateContent }
