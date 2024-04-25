import type { LexicalEditor } from "lexical"
import { Typography } from "@material-ui/core"
import { UploadFileMutationHookResult } from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import { head as Ahead } from "fp-ts/Array"
import {
  of as Oof,
  map as Omap,
  fromNullable as OfromNullable,
  some,
  none,
  Option,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { map as Tmap } from "fp-ts/Task"
import {
  left as Eleft,
  right as Eright,
  isLeft as EisLeft,
  isRight as EisRight,
  fromOption as EfromOption,
  match as Ematch,
  Either,
  bindTo as EbindTo,
  bind as Ebind,
  let as Elet,
} from "fp-ts/Either"
import {
  tryCatch as TEtryCatch,
  bind as TEbind,
  let as TElet,
  fromEither as TEfromEither,
  right as TEright,
  left as TEleft,
} from "fp-ts/TaskEither"
import { match, P } from "ts-pattern"
import { INSERT_IMAGE_COMMAND } from "image-plugin"

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

const FILE_SIZE_LIMIT = 1_000_000

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
  message: "Chosen file size is too large. It must be smaller than 1MB.",
}
const accessTokenError = {
  errorType: ErrorType.ACCESS_TOKEN_ERROR,
  message: "Could not get access token",
}
const uploadFailure = {
  errorType: ErrorType.UPLOAD_FAILURE,
  message: "Could not upload image to server",
}
const missingUrlError = {
  errorType: ErrorType.MISSING_URL,
  message: "Image url missing",
}
const imageLoadError = {
  errorType: ErrorType.IMAGE_LOAD_ERROR,
  message: "Could not load image",
}
const editorInsertionError = {
  errorType: ErrorType.EDITOR_INSERTION,
  message: "Could not insert image into editor",
}

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

const renderError = (
  imageState: Option<Either<ErrorState, ImageSuccessState>>,
) =>
  pipe(
    imageState,
    Omap(
      Ematch(
        (someError) => (
          <Typography color="error">{someError.message}</Typography>
        ),
        () => <></>,
      ),
    ),
    OgetOrElse(() => <></>),
  )

const resolveDimensions = (source: string) =>
  new Promise<{ height: number; width: number }>((resolve, reject) => {
    console.log(source)
    const imageElement = new Image()
    console.log(imageElement)
    imageElement.src = source
    // eslint-disable-next-line unicorn/prefer-add-event-listener
    imageElement.onload = () =>
      resolve({
        height: imageElement.naturalHeight,
        width: imageElement.naturalWidth,
      })
    // eslint-disable-next-line unicorn/prefer-add-event-listener
    imageElement.onerror = reject
  })

const TEresolveDimensions = (url: string) =>
  TEtryCatch(
    () => resolveDimensions(url),
    () => imageLoadError,
  )

const scaleDimensions = (
  { height, width }: { height: number; width: number },
  baseWidth: number,
) => {
  const aspectRatio = width / height
  const newHeight = baseWidth / aspectRatio
  return { height: newHeight, width: baseWidth }
}

const createImageUploadFunction = (
  editor: LexicalEditor,
  getAccessToken: (
    resource?: string | undefined,
  ) => Promise<string | undefined>,
  uploadImage: UploadFileMutationHookResult[0],
  imageState: Option<Either<ErrorState, ImageSuccessState>>,
  setImageState: React.Dispatch<
    React.SetStateAction<Option<Either<ErrorState, ImageSuccessState>>>
  >,
  alignment: "left" | "right",
  setDialogDisplay: any,
) =>
  pipe(
    imageState,
    OgetOrElse(() => Eleft(noFileSelectedError)),
    TEfromEither,
    TEbind("token", () =>
      TEtryCatch(
        () =>
          getAccessToken(import.meta.env.VITE_APP_LOGTO_API_SECOND_RESOURCE),
        () => accessTokenError,
      ),
    ),
    TEbind("uploadResult", ({ validFile, token }) =>
      TEtryCatch(
        () =>
          uploadImage({
            variables: { file: validFile },
            context: { headers: { Authorization: `Bearer ${token}` } },
          }),
        () => uploadFailure,
      ),
    ),
    TEbind("url", ({ uploadResult }) =>
      match(uploadResult)
        .with({ data: { uploadFile: { url: P.select(P.string) } } }, (url) =>
          TEright(url),
        )
        .otherwise(() => TEleft(missingUrlError)),
    ),
    TEbind("dimensions", ({ url }) => TEresolveDimensions(url)),
    TElet("scaledDimensions", ({ dimensions }) =>
      scaleDimensions(dimensions, 400),
    ),
    TEbind("insertImage", ({ url, scaledDimensions }) => {
      const editorUpdate = editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
        source: url,
        height: scaledDimensions.height,
        width: scaledDimensions.width,
        alignment
      })
      return match(editorUpdate)
        .with(true, () => TEright(true))
        .with(false, () => TEleft(editorInsertionError))
        .exhaustive()
    }),
    Tmap((result) => {
      if (EisLeft(result)) {
        setImageState(some(result))
      }
      if (EisRight(result)) {
        setImageState(none)
        setDialogDisplay(false)
      }
    }),
  )

export {
  EgetValidFile,
  isValidFile,
  renderError,
  resolveDimensions, 
  TEresolveDimensions,
  scaleDimensions,
  createImageUploadFunction,
  type ErrorState,
  type ImageSuccessState,
}
