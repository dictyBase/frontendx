import { pipe } from "fp-ts/function"
import { head as Ahead } from "fp-ts/Array"
import {
  some,
  none,
  of as Oof,
  map as Omap,
  fromNullable as OfromNullable,
  Option,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import {
  left as Eleft,
  right as Eright,
  fromOption as EfromOption,
  match as Ematch,
  Either,
  bindTo as EbindTo,
  bind as Ebind,
  let as Elet,
  filterOrElse as EfilterOrElse,
} from "fp-ts/Either"

enum ErrorType {
  VALIDITY_ERROR,
  ACCESS_TOKEN_ERROR,
  UPLOAD_FAILURE,
  MISSING_URL,
  IMAGE_LOAD_ERROR,
  EDITOR_INSERTION,
}

type ImageSuccessState = {
  validFile: File
}

type ErrorState = {
  message: string
  errorType: ErrorType
}

const FILE_SIZE_LIMIT = 10 * 1024 * 1024

const emptyFileListError = {
  errorType: ErrorType.VALIDITY_ERROR,
  message: "File list is empty",
}
const noFileSelectedError = {
  errorType: ErrorType.VALIDITY_ERROR,
  message: "No file selected",
}
const overFileSizeLimitError = {
  errorType: ErrorType.VALIDITY_ERROR,
  message: `Chosen file size is too large. It may not exceed ${
    FILE_SIZE_LIMIT / (1024 * 1024)
  }MB.`,
}
const accessTokenError = {
  errorType: ErrorType.ACCESS_TOKEN_ERROR,
  message: "Could not get access token",
}
const uploadFailureError = {
  errorType: ErrorType.UPLOAD_FAILURE,
  message: "Could not upload image to server",
}
const missingUrlError = {
  errorType: ErrorType.MISSING_URL,
  message: "File url missing",
}

const fileSizeCheck = (fileSize: number) => (file: File) =>
  file.size <= fileSize

const getFileError = (file: File) =>
  pipe(
    Eright(file),
    EfilterOrElse(fileSizeCheck(FILE_SIZE_LIMIT), () => overFileSizeLimitError),
    Ematch(
      (error) => some(error),
      () => none,
    ),
  )

const EgetValidFile = (files: FileList | null) =>
  pipe(
    files,
    OfromNullable,
    EfromOption(() => emptyFileListError),
    EbindTo("fileList"),
    Elet("presentFiles", ({ fileList }) => [...fileList]),
    Ebind("selectedFile", ({ presentFiles }) =>
      pipe(
        presentFiles,
        Ahead,
        EfromOption(() => noFileSelectedError),
      ),
    ),
    Ebind("validFile", ({ selectedFile }) =>
      selectedFile.size < FILE_SIZE_LIMIT
        ? Eright(selectedFile)
        : Eleft(overFileSizeLimitError),
    ),
    Oof,
  )

const isValidFile = (
  imageState: Option<Either<ErrorState, ImageSuccessState>>,
) =>
  pipe(
    imageState,
    Omap(
      Ematch(
        ({ errorType }) => errorType !== ErrorType.VALIDITY_ERROR,
        ({ validFile }) => !!validFile,
      ),
    ),
    OgetOrElse(() => false),
  )

export {
  emptyFileListError,
  noFileSelectedError,
  accessTokenError,
  overFileSizeLimitError,
  uploadFailureError,
  missingUrlError,
  getFileError,
  EgetValidFile,
  isValidFile,
  type ErrorState,
  type ImageSuccessState,
}
