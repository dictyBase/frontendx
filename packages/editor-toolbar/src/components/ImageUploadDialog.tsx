import { useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
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
import { useUploadFileMutation } from "dicty-graphql-schema"
import { useLogto } from "@logto/react"
import { useSetAtom } from "jotai"
import { pipe } from "fp-ts/function"
import { head as Ahead } from "fp-ts/Array"
import {
  of as Oof,
  map as Omap,
  fromNullable as OfromNullable,
  bindTo as ObindTo,
  bind as Obind,
  let as Olet,
  none,
  some,
  Option,
  match as Omatch,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import {
  left as Eleft, 
  right as Eright,
  isLeft as EisLeft, 
  isRight as EisRight,
  fromOption as EfromOption,
  map as Emap,
  filterOrElse as EfilterOrElse,
  match as Ematch,
  Either,
  mapLeft as EmapLeft,
  bindTo as EbindTo,
  bind as Ebind,
  let as Elet,
} from "fp-ts/Either"
import {
  tryCatch as TEtryCatch,
  flatMap as TEflatMap,
  bindTo as TEbindTo,
  let as TElet,
  bind as TEbind,
  map as TEmap,
  fromEither as TEfromEither,
  right as TEright,
  left as TEleft,
} from "fp-ts/TaskEither"
import { match, P } from "ts-pattern"
import { INSERT_IMAGE_COMMAND } from "image-plugin"
import { insertImageDialogOpenAtom } from "../context/atomConfigs"

const useStyles = makeStyles({ input: { display: "flex" } })

const fileSizePredicate = (file: File) => file.size < 1_000_000

enum ErrorType {
  VALIDITY_ERROR,
  AUTHORIZATION_FAILURE,
  UPLOAD_FAILURE,
  MISSING_URL,
  EDITOR_INSERTION
}
type ImageUploadDialogProperties = {
  open: boolean
}

type ImageSuccessStates = {
  validFile: File
}

type ErrorState = {
  message: string
  errorType: ErrorType
}

const emptyFileListError = { errorType: ErrorType.VALIDITY_ERROR, message: "File list is empty" }
const noFileSelectedError = { errorType: ErrorType.VALIDITY_ERROR, message: "No file selected" }
const overFileSizeLimitError = { errorType: ErrorType.VALIDITY_ERROR, message: "Chosen image is too large. It must be smaller than 1MB." }
const authorizationFailureError = { errorType: ErrorType.AUTHORIZATION_FAILURE, message: "Authorization failed" }
const uploadFailure = { errorType: ErrorType.UPLOAD_FAILURE, message: "Could not upload image to server" }
const missingUrlError = { errorType: ErrorType.MISSING_URL, message: "Image url missing" }
const editorInsertionError = { errorType: ErrorType.EDITOR_INSERTION, message: "Could not insert image into editor" }

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
      selectedFile.size < 1_000_000 ? Eright(selectedFile) : Eleft(overFileSizeLimitError)
    ),
    Oof
  )

const renderError = (imageState: Option<Either<ErrorState, ImageSuccessStates>>) =>
  pipe(
    imageState,
    Omap(
      Ematch(
        (someError) => <Typography color="error">{someError.message}</Typography>,
        () => <></>,
      ),
    ),
    OgetOrElse(() => <></>),
  )

const ImageUploadDialog = ({ open }: ImageUploadDialogProperties) => {
  const { getAccessToken } = useLogto()
  const [editor] = useLexicalComposerContext()
  const setDialogDisplay = useSetAtom(insertImageDialogOpenAtom)
  const [uploadImage, { loading, reset }] = useUploadFileMutation()
  const [imageState, setImageState] =
    useState<Option<Either<ErrorState, ImageSuccessStates>>>(none)
  const { input } = useStyles()

  const canInsert = pipe(
    imageState,
    Omap(
      Ematch(
        ({ errorType }) => errorType !== ErrorType.VALIDITY_ERROR,
        ({ validFile }) => !!validFile,
      ),
    ),
    OgetOrElse(() => false),
  )
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
    pipe(
      imageState,
      Omap((eitherImageState) =>
        pipe(
          eitherImageState,
          TEfromEither,
          TEbind("token", () =>
            TEtryCatch(
              () =>
                getAccessToken(
                  import.meta.env.VITE_APP_LOGTO_API_SECOND_RESOURCE,
                ),
              () => authorizationFailureError,
            ),
          ),
          TEbind("uploadResult", ({  validFile, token }) =>
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
              .with(
                { data: { uploadFile: { url: P.select(P.string) } } },
                (url) => TEright(url),
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
        ),
      ),
      OgetOrElse(() => TEleft(noFileSelectedError)),
      async (uploadTask) => {
        const result = await uploadTask()
        if (EisLeft(result)) {
          setImageState(some(result))
        }
        if (EisRight(result)) {
          setImageState(some(result))
          setDialogDisplay(false)
        }
      },
    )
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
          <Button type="button" disabled={!canInsert} onClick={onSubmit}>
            Insert Image
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export { ImageUploadDialog }
