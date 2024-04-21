import { useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import type { LexicalEditor } from "lexical"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Input,
  makeStyles,
} from "@material-ui/core"
import {
  useUploadFileMutation,
  UploadFileMutationHookResult,
} from "dicty-graphql-schema"
import { useLogto } from "@logto/react"
import { useSetAtom } from "jotai"
import { pipe } from "fp-ts/function"
import { head as Ahead } from "fp-ts/Array"
import {
  of as Oof,
  map as Omap,
  fromNullable as OfromNullable,
  none,
  some,
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
  fromEither as TEfromEither,
  right as TEright,
  left as TEleft,
} from "fp-ts/TaskEither"
import { match, P } from "ts-pattern"
import { INSERT_IMAGE_COMMAND } from "image-plugin"
import { insertImageDialogOpenAtom } from "../context/atomConfigs"

const useStyles = makeStyles({ input: { display: "flex" } })

enum ErrorType {
  VALIDITY_ERROR,
  ACCESS_TOKEN_ERROR,
  UPLOAD_FAILURE,
  MISSING_URL,
  EDITOR_INSERTION,
}

type ImageUploadDialogProperties = {
  open: boolean
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
  message: "Chosen image is too large. It must be smaller than 1MB.",
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

const createImageUploadFunction = (
  editor: LexicalEditor,
  getAccessToken: (
    resource?: string | undefined,
  ) => Promise<string | undefined>,
  uploadImage: UploadFileMutationHookResult[0],
  setImageState: React.Dispatch<
    React.SetStateAction<Option<Either<ErrorState, ImageSuccessState>>>
  >,
  setDialogDisplay: any,
  imageState: Option<Either<ErrorState, ImageSuccessState>>,
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
    TEbind("insertImage", ({ url }) => {
      const editorUpdate = editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
        source: url,
        width: 300,
        height: 300,
      })
      return match(editorUpdate)
        .with(true, () => TEright(true))
        .with(false, () => TEleft(editorInsertionError))
        .exhaustive()
    }),
    Tmap((uploadTask) => {
      const result = uploadTask
      if (EisLeft(result)) {
        setImageState(some(result))
      }
      if (EisRight(result)) {
        setImageState(some(result))
        setDialogDisplay(false)
      }
    }),
  )

const ImageUploadDialog = ({ open }: ImageUploadDialogProperties) => {
  const { getAccessToken } = useLogto()
  const [editor] = useLexicalComposerContext()
  const setDialogDisplay = useSetAtom(insertImageDialogOpenAtom)
  const [uploadImage, { loading, reset }] = useUploadFileMutation()
  const [imageState, setImageState] =
    useState<Option<Either<ErrorState, ImageSuccessState>>>(none)
  const { input } = useStyles()

  const canSubmit = isValidFile(imageState)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = async ({
    target: { files },
  }) => {
    reset()
    setImageState(none)
    pipe(files, EgetValidFile, setImageState)
  }

  const handleClose = () => {
    if (loading) return
    setDialogDisplay(false)
    setImageState(none)
    reset()
  }

  const onSubmit = () => {
    const uploadFunction = createImageUploadFunction(
      editor,
      getAccessToken,
      uploadImage,
      setImageState,
      setDialogDisplay,
      imageState,
    )
    uploadFunction()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle disableTypography>
        <Typography variant="h3"> Choose an Image to Upload </Typography>
      </DialogTitle>
      <DialogContent>
        <Input
          type="file"
          id="image-upload"
          onChange={onChange}
          fullWidth
          className={input}
          inputProps={{ accept: "image/*" }}
        />
        {renderError(imageState)}
        <DialogActions>
          {loading ? <CircularProgress /> : <></>}
          <Button type="button" disabled={!canSubmit} onClick={onSubmit}>
            Insert Image
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export { ImageUploadDialog }
