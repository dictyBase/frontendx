import { pipe } from "fp-ts/function"
import { useLogto } from "@logto/react"
import { useCreateContentMutation } from "dicty-graphql-schema"
import {
  Do as TEDo,
  let as TElet,
  bind as TEbind,
  tryCatch as TEtryCatch,
  map as TEmap,
  fromOption as TEfromOption,
} from "fp-ts/TaskEither"
import { fromNullable as OfromNullable } from "fp-ts/Option"
import {
  userInfoError,
  accessTokenError,
  createFailureError,
} from "../constants/types"

const useAuthorizedCreateContent = () => {
  const { getAccessToken, fetchUserInfo } = useLogto()
  const [createContent] = useCreateContentMutation()

  return (content: string, namespace: string, name: string) => {
    const task = pipe(
      TEDo,
      TElet("newContent", () => content),
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
      TEbind("create", ({ newContent, token, userEmail }) =>
        TEtryCatch(
          () =>
            createContent({
              variables: {
                input: {
                  name,
                  namespace,
                  created_by: userEmail,
                  content: newContent,
                },
              },
              context: { headers: { Authorization: `Bearer ${token}` } },
            }),
          () => createFailureError,
        ),
      ),
      TEmap(({ create }) => create),
    )
    return task()
  }
}

export { useAuthorizedCreateContent }
