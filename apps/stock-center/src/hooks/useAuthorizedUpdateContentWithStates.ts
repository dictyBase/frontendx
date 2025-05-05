import { useState, useCallback } from "react"
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
import { userInfoError, accessTokenError, updateFailureError } from "../types"

const useAuthorizedUpdateContentWithStates = (contentId: string) => {
  const { getAccessToken, fetchUserInfo } = useLogto()
  const [authLoading, setAuthLoading] = useState(false)
  const [updateContent, result] = useUpdateContentMutation()
  const authorizedUpdateContent = useCallback(
    (content: string) => {
      const task = pipe(
        TEDo,
        TEbind("OuserInfo", () =>
          TEtryCatch(
            () => {
              setAuthLoading(true)
              return fetchUserInfo()
            },
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
              getAccessToken(
                import.meta.env.VITE_APP_LOGTO_API_SECOND_RESOURCE,
              ),
            () => accessTokenError,
          ),
        ),
        TEbind("update", ({ token, userEmail }) =>
          TEtryCatch(
            () => {
              const mutation = updateContent({
                variables: {
                  input: {
                    id: contentId,
                    content,
                    updated_by: userEmail,
                  },
                },
                context: { headers: { Authorization: `Bearer ${token}` } },
              })
              setAuthLoading(false)
              return mutation
            },
            () => updateFailureError,
          ),
        ),
        TEmap(({ update }) => update),
      )
      return task()
    },
    [contentId, fetchUserInfo, getAccessToken, updateContent],
  )
  return [
    authorizedUpdateContent,
    { ...result, loading: BMonoidAny.concat(result.loading, authLoading) },
  ] as [typeof authorizedUpdateContent, MutationResult<UpdateContentMutation>]
}

export { useAuthorizedUpdateContentWithStates }
