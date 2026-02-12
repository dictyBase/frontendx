import { object, string } from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { pipe, apply } from "fp-ts/function"
import { MonoidAll as BMonoidAll } from "fp-ts/boolean"
import { map as Amap, reduce as Areduce } from "fp-ts/Array"
import { some, none } from "fp-ts/Option"
import {
  right as Eright,
  match as Ematch,
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

const isValidFile = (file: File) =>
  pipe(
    [fileSizeCheck(FILE_SIZE_LIMIT)],
    Amap(apply(file)),
    Areduce(true, BMonoidAll.concat),
  )

const getFileValidationError = (file: File) =>
  pipe(
    Eright(file),
    EfilterOrElse(fileSizeCheck(FILE_SIZE_LIMIT), () => overFileSizeLimitError),
    Ematch(
      (error) => some(error),
      () => none,
    ),
  )

const maximumCharacters = 50
const excessiveLengthMessage = `* May not exceed ${maximumCharacters} characters`
// const invalidNameMessage = "* Invalid file name"
const restrictedCharactersMessage =
  '* may only use alphanumeric characters\n and ".", "-", "_"'

const validationSchema = object().shape({
  suggestedFilename: string()
    .required("* filename name may not be empty")
    .max(maximumCharacters, excessiveLengthMessage)
    .matches(/^[\w.-]*$/, restrictedCharactersMessage),
})

const useValidateSuggestedFilename = () =>
  useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  })

type FileFormFields = {
  suggestedFilename: string
}

export {
  useValidateSuggestedFilename,
  emptyFileListError,
  noFileSelectedError,
  accessTokenError,
  overFileSizeLimitError,
  uploadFailureError,
  missingUrlError,
  fileSizeCheck,
  getFileValidationError,
  isValidFile,
  type FileFormFields,
  type ErrorState,
}
