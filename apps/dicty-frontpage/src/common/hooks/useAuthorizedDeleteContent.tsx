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
import {
  missingContentIdError,
  accessTokenError,
  deleteFailureError,
} from "../constants/types"

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
