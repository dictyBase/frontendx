import { pipe } from "fp-ts/function"
import {
  Do as TEDo,
  bind as TEbind,
  let as TElet,
  tryCatch as TEtryCatch,
  fromOption as EfromOption,
} from "fp-ts/TaskEither"
import {
  Option,
  fromNullable as OfromNullable,
  map as Omap,
} from "fp-ts/Option"
import { UploadFileMutationHookResult } from "dicty-graphql-schema"
import { accessTokenError, uploadFailureError } from "./fileUploadHelpers"

enum ErrorType {
  VALIDITY_ERROR,
  ACCESS_TOKEN_ERROR,
  UPLOAD_FAILURE,
}

const noFileSelectedError = {
  errorType: ErrorType.VALIDITY_ERROR,
  message: "No file selected",
}

/**
 * 1. User inputs file
 * 2. File is validated (size, type?)
 * 3. File is uploaded
 * 4. GraphQL mutation returns uploaded file url to user
 *
 * @param file The file to be uploaded
 * @param uploadAsName The name that the file will be saved as in the storage bucket
 * @param uploadMutation The mutation function
 * @param getAccessToken The `logto` function to fetch the user's access token
 */
const createFileUploadFunction = (
  file: Option<File>,
  uploadAsName: string,
  uploadMutation: UploadFileMutationHookResult[0],
  getAccessToken: (
    resource?: string | undefined,
  ) => Promise<string | undefined>,
) =>
  pipe(
    TEDo,
    TEbind("selectedFile", () =>
      pipe(
        file,
        EfromOption(() => noFileSelectedError),
      ),
    ),
    TElet("uploadName", () => uploadAsName),
    TEbind("token", () =>
      TEtryCatch(
        () =>
          getAccessToken(import.meta.env.VITE_APP_LOGTO_API_SECOND_RESOURCE),
        () => accessTokenError,
      ),
    ),
    TEbind("uploadResult", ({ selectedFile, token, uploadName }) =>
      TEtryCatch(
        () =>
          uploadMutation({
            variables: { file: selectedFile, name: uploadName },
            context: { headers: { Authorization: `Bearer ${token}` } },
          }),
        () => uploadFailureError,
      ),
    ),
    TEbind("url", ({ uploadResult }) =>
      pipe(
        uploadResult.data,
        OfromNullable,
        Omap(({ uploadFile: { url } }) => url),
        EfromOption(() => uploadFailureError),
      ),
    ),
  )

export { createFileUploadFunction }
