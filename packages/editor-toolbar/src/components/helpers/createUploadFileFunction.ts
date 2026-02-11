import { pipe } from "fp-ts/function"
import {
  Do as TEDo,
  bind as TEbind,
  let as TElet,
  tryCatch as TEtryCatch,
  fromOption as EfromOption,
} from "fp-ts/TaskEither"
import { fromNullable as OfromNullable, map as Omap } from "fp-ts/Option"
import { UploadFileMutationHookResult } from "dicty-graphql-schema"
import { accessTokenError, uploadFailureError } from "./fileUploadHelpers"

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
  file: File,
  uploadAsName: string,
  uploadMutation: UploadFileMutationHookResult[0],
  getAccessToken: (
    resource?: string | undefined,
  ) => Promise<string | undefined>,
) =>
  pipe(
    TEDo,
    TElet("selectedFile", () => pipe(file)),
    TElet("uploadName", () => uploadAsName),
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
