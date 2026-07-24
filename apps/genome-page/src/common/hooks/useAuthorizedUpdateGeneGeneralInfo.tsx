import { pipe } from "fp-ts/function"
import { useLogto } from "@logto/react"
import {
  useUpdateGeneGeneralInfoMutation,
  UpdateGeneGeneralInfoInput,
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
  ACCESS_TOKEN,
  USER_INFO,
  UPDATE,
  VALIDATION,
}

type UpdateGeneGeneralInfoError = {
  errorType: Errors
  message: string
}

const userInfoError: UpdateGeneGeneralInfoError = {
  errorType: Errors.USER_INFO,
  message: "Could not get user info",
}

const accessTokenError: UpdateGeneGeneralInfoError = {
  errorType: Errors.ACCESS_TOKEN,
  message: "Could not get access token",
}

const updateFailureError: UpdateGeneGeneralInfoError = {
  errorType: Errors.UPDATE,
  message: "Could not update data",
}

const useAuthorizedUpdateGeneGeneralInfo = () => {
  const { getAccessToken, fetchUserInfo } = useLogto()
  const [updateGeneGeneralInformation] = useUpdateGeneGeneralInfoMutation({
    refetchQueries: [GeneGeneralInformationSummaryDocument],
  })

  return (id: string, input: Omit<UpdateGeneGeneralInfoInput, "user">) =>
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
            updateGeneGeneralInformation({
              variables: {
                id,
                input: { ...input, user: userEmail },
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
  useAuthorizedUpdateGeneGeneralInfo,
  Errors,
  type UpdateGeneGeneralInfoError,
}
