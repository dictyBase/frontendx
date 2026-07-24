import { pipe } from "fp-ts/function"
import { useLogto } from "@logto/react"
import {
  useCreateGeneGeneralInfoMutation,
  CreateGeneGeneralInfoInput,
  GeneGeneralInformationSummaryDocument,
} from "dicty-graphql-schema"
import {
  Do as TEDo,
  bind as TEbind,
  tryCatch as TEtryCatch,
  map as TEmap,
  fromOption as TEfromOption,
} from "fp-ts/TaskEither"
import { fromNullable as OfromNullable } from "fp-ts/Option"

enum Errors {
  ACCESS_TOKEN_ERROR,
  USER_INFO_ERROR,
  CREATE_FAILURE,
  VALIDATION,
}

type CreateGeneGeneralInfoError = {
  errorType: Errors
  message: string
}

const userInfoError = {
  errorType: Errors.USER_INFO_ERROR,
  message: "Could not get user info",
}

const accessTokenError = {
  errorType: Errors.ACCESS_TOKEN_ERROR,
  message: "Could not get access token",
}

const createFailureError = {
  errorType: Errors.CREATE_FAILURE,
  message: "Could not create data",
}

const useAuthorizedCreateGeneGeneralInfo = () => {
  const { getAccessToken, fetchUserInfo } = useLogto()
  const [createGeneGeneralInformation] = useCreateGeneGeneralInfoMutation({
    refetchQueries: [GeneGeneralInformationSummaryDocument],
  })

  return (id: string, input: Omit<CreateGeneGeneralInfoInput, "user">) =>
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
      TEbind("create", ({ token, userEmail }) =>
        TEtryCatch(
          () =>
            createGeneGeneralInformation({
              variables: {
                id,
                input: { ...input, user: userEmail },
              },
              context: { headers: { Authorization: `Bearer ${token}` } },
            }),
          () => createFailureError,
        ),
      ),
      TEmap(({ create }) => create),
    )
}

export {
  type CreateGeneGeneralInfoError,
  Errors,
  useAuthorizedCreateGeneGeneralInfo,
}
