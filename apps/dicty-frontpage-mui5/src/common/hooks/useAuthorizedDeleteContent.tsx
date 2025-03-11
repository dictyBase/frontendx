import { pipe } from "fp-ts/function"
import { useLogto } from "@logto/react"
import { useDeleteContentMutation } from "dicty-graphql-schema"
import { Option } from "fp-ts/Option"
import {
  Do as TEDo,
  bind as TEbind,
  tryCatch as TEtryCatch,
  map as TEmap,
  fromOption as TEfromOption,
} from "fp-ts/TaskEither"

enum ErrorType {
  MISSING_CONTENT_ID,
  ACCESS_TOKEN,
  DELETE_FAILURE,
}

const missingContentIdError = {
  errorType: ErrorType.MISSING_CONTENT_ID,
  message: "Could not get access token",
}

const accessTokenError = {
  errorType: ErrorType.ACCESS_TOKEN,
  message: "Could not get access token",
}

const deleteFailureError = {
  errorType: ErrorType.DELETE_FAILURE,
  message: "Could not delete content",
}

const useAuthorizedDeleteContent = (contentId: Option<string>) => {
  const { getAccessToken } = useLogto()
  const [deleteContent] = useDeleteContentMutation()

  return () => {
    const task = pipe(
      TEDo,
      TEbind("id", () =>
        pipe(
          contentId,
          TEfromOption(() => missingContentIdError),
        ),
      ),
      TEbind("token", () =>
        TEtryCatch(
          () =>
            getAccessToken(import.meta.env.VITE_APP_LOGTO_API_SECOND_RESOURCE),
          () => accessTokenError,
        ),
      ),
      TEbind("deleted", ({ id, token }) =>
        TEtryCatch(
          () =>
            deleteContent({
              variables: {
                id,
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

export { useAuthorizedDeleteContent }
