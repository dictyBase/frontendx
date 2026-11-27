import { pipe } from "fp-ts/function"
import { useLogto } from "@logto/react"
import {
  useUpdateStrainMutation,
  UpdateStrainInput,
  UpdateStrainMutation,
  StrainDocument,
} from "dicty-graphql-schema"
import { FetchResult } from "@apollo/client"
import {
  TaskEither,
  Do as TEDo,
  bind as TEbind,
  tryCatch as TEtryCatch,
  map as TEmap,
  fromOption as TEfromOption,
} from "fp-ts/TaskEither"
import { fromNullable as OfromNullable } from "fp-ts/Option"

enum StrainUpdateErrorType {
  ACCESS_TOKEN = "ACCESS_TOKEN",
  USER_INFO = "USER_INFO",
  UPDATE = "UPDATE",
  VALIDATION = "VALIDATION",
}

type UpdateStrainError = {
  errorType: StrainUpdateErrorType
  message: string
}

const userInfoError: UpdateStrainError = {
  errorType: StrainUpdateErrorType.USER_INFO,
  message: "Could not get user info",
}

const accessTokenError: UpdateStrainError = {
  errorType: StrainUpdateErrorType.ACCESS_TOKEN,
  message: "Could not get access token",
}

const updateFailureError: UpdateStrainError = {
  errorType: StrainUpdateErrorType.UPDATE,
  message: "Could not update strain data",
}

/**
 * Custom hook that returns a TaskEither function for performing an authorized
 * `UpdateStrain` GraphQL mutation and refetching the `Strain` query.
 *
 * @returns A function taking `(id, input)` and returning a `TaskEither` that
 * resolves with the Apollo mutation result or fails with an `UpdateStrainError`.
 */
const useAuthorizedUpdateStrain = () => {
  const { getAccessToken, fetchUserInfo } = useLogto()
  const [updateStrain] = useUpdateStrainMutation({
    refetchQueries: [StrainDocument],
  })

  return (
    id: string,
    input: Omit<UpdateStrainInput, "updated_by">,
  ): TaskEither<UpdateStrainError, FetchResult<UpdateStrainMutation>> =>
    pipe(
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
            updateStrain({
              variables: {
                id,
                input: { ...input, updated_by: userEmail },
              },
              context: { headers: { Authorization: `Bearer ${token}` } },
            }),
          () => updateFailureError,
        ),
      ),
      TEmap(({ update }) => update),
    )
}

export {
  useAuthorizedUpdateStrain,
  StrainUpdateErrorType,
  userInfoError,
  accessTokenError,
  updateFailureError,
  type UpdateStrainError,
}
