import { pipe } from "fp-ts/function"
import { useLogto } from "@logto/react"
import { useUpdateContentMutation } from "dicty-graphql-schema"
import {
  Do as TEDo,
  bind as TEbind,
  tryCatch as TEtryCatch,
  map as TEmap,
  fromOption as TEfromOption,
} from "fp-ts/TaskEither"
import { fromNullable as OfromNullable } from "fp-ts/Option"
import {
  userInfoError,
  accessTokenError,
  updateFailureError,
} from "../constants/types"

const useAuthorizedUpdateContent = (contentId: string) => {
  const { getAccessToken, fetchUserInfo } = useLogto()
  const [updateContent] = useUpdateContentMutation()

  return (content: string) => {
    const task = pipe(
      TEDo,
      TEbind("OuserInfo", () =>
        TEtryCatch(
          () => fetchUserInfo(),
          () => userInfoError,
        ),
      ),
      TEbind("userInfo", ({ OuserInfo }) =>
        pipe(
          OuserInfo,
          OfromNullable,
          TEfromOption(() => userInfoError),
        ),
      ),
      TEbind("userEmail", ({ userInfo }) =>
        pipe(
          userInfo.email,
          OfromNullable,
          TEfromOption(() => userInfoError),
        ),
      ),
      TEbind("token", () =>
        TEtryCatch(
          () =>
            getAccessToken(import.meta.env.VITE_APP_LOGTO_API_SECOND_RESOURCE),
          () => accessTokenError,
        ),
      ),
      TEbind("update", ({ token, userEmail }) =>
        TEtryCatch(
          () =>
            updateContent({
              variables: {
                input: {
                  id: contentId,
                  content,
                  updated_by: userEmail,
                },
              },
              context: { headers: { Authorization: `Bearer ${token}` } },
            }),
          () => updateFailureError,
        ),
      ),
      TEbind("data", ({ update }) =>
        pipe(
          update.data,
          OfromNullable,
          TEfromOption(() => updateFailureError),
        ),
      ),
      TEmap(({ data }) => data),
    )
    return task()
  }
}

export { useAuthorizedUpdateContent }
