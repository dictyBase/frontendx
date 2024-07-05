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

enum ErrorType {
  ACCESS_TOKEN_ERROR,
  USER_INFO_ERROR,
  UPDATE_FAILURE,
}

const userInfoError = {
  errorType: ErrorType.USER_INFO_ERROR,
  message: "Could not get user info",
}

const accessTokenError = {
  errorType: ErrorType.ACCESS_TOKEN_ERROR,
  message: "Could not get access token",
}

const updateFailureError = {
  errorType: ErrorType.UPDATE_FAILURE,
  message: "Could not update content",
}

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
      TEmap(({ update }) => update),
    )
    return task()
  }
}

export { useAuthorizedUpdateContent }
