import { pipe } from "fp-ts/function"
import {
  Do as TEDo,
  let as TElet,
  bind as TEbind,
  tryCatch as TEtryCatch,
  of as TEof,
  filterOrElse as TEfilterOrElse,
  fromOption as EfromOption,
} from "fp-ts/TaskEither"
import { fromNullable as OfromNullable, map as Omap } from "fp-ts/Option"
import { UploadFileMutationHookResult } from "dicty-graphql-schema"

enum ErrorType {
  VALIDITY_ERROR,
  ACCESS_TOKEN_ERROR,
  UPLOAD_FAILURE,
}

const overFileSizeLimitError = {
  errorType: ErrorType.VALIDITY_ERROR,
  message: "Chosen file size is too large. It must be smaller than 1MB.",
}

const accessTokenError = {
  errorType: ErrorType.ACCESS_TOKEN_ERROR,
  message: "Could not get access token",
}

const uploadFailureError = {
  errorType: ErrorType.UPLOAD_FAILURE,
  message: "Could not upload image to server",
}

const FILE_SIZE_LIMIT = 10_000_000

const isValidFile = (file: File) => file.size < FILE_SIZE_LIMIT

/**
 * 1. User inputs file
 * 2. File is validated (size, type?)
 * 3. File is uploaded
 * 4. GraphQL mutation returns uploaded file url to user
 */
const createFileUploadFunction = (
  file: File,
  uploadMutation: UploadFileMutationHookResult[0],
  getAccessToken: (
    resource?: string | undefined,
  ) => Promise<string | undefined>,
) =>
  pipe(
    TEDo,
    TElet("selectedFile", () => file),
    TEbind("token", () =>
      TEtryCatch(
        () =>
          getAccessToken(import.meta.env.VITE_APP_LOGTO_API_SECOND_RESOURCE),
        () => accessTokenError,
      ),
    ),
    TEbind("uploadResult", ({ selectedFile, token }) =>
      TEtryCatch(
        () =>
          uploadMutation({
            variables: { file: selectedFile },
            context: { headers: { Authorization: `Bearer ${token}` } },
          }),
        () => uploadFailureError,
      ),
    ),
    TElet("url", ({ uploadResult }) =>
      pipe(
        uploadResult.data,
        OfromNullable,
        Omap(({ uploadFile: { url } }) => url),
        EfromOption(() => uploadFailureError),
      ),
    ),
  )

export { createFileUploadFunction }
