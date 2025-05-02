import { useMemo } from "react"
import { pipe } from "fp-ts/function"
import { useLogto } from "@logto/react"
import {
  useUpdateContentMutation,
  UpdateContentMutation,
} from "dicty-graphql-schema"
import { MutationResult } from "@apollo/client"
import { MonoidAny as BMonoidAny } from "fp-ts/boolean"
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

const useAuthorizedUpdateContentWithStates = (contentId: string) => {
  const {
    getAccessToken,
    fetchUserInfo,
    isLoading: logtoIsLoading,
  } = useLogto()
  const [updateContent, result] = useUpdateContentMutation()
  const authorizedUpdateContent = (content: string) => {
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
  return [
    authorizedUpdateContent,
    { ...result, loading: BMonoidAny.concat(result.loading, logtoIsLoading) },
  ] as [typeof authorizedUpdateContent, MutationResult<UpdateContentMutation>]
}

export { useAuthorizedUpdateContentWithStates }
