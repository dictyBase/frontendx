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
  fromOption as EfromOption,
  map as Emap,
  filterOrElse as EfilterOrElse,
  match as Ematch,
  Either,
  mapLeft as EmapLeft,
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

type ImageUploadDialogProperties = {
  open: boolean
}

type ImageSuccessStates = {
  validFile: File

}
const getEitherValidFile = (files: FileList | null) =>
  pipe(
    files,
    OfromNullable,
    ObindTo("fileList"),
    Olet("presentFiles", ({ fileList }) => [...fileList]),
    Olet("selectedFile", ({ presentFiles }) =>
      pipe(
        presentFiles,
        Ahead,
        EfromOption(() => "No file selected"),
      ),
    ),
    Olet("validFile", ({ selectedFile }) =>
      pipe(
        selectedFile,
        EfilterOrElse(
          fileSizePredicate,
          () => "The chosen image is too large. It must be smaller than 1MB.",
        ),
      ),
    ),
    Omap(({ validFile }) => validFile),
  )

const renderError = (imageState: Option<Either<string, File>>) =>
  pipe(
    imageState,
    Omap(
      Ematch(
        (someError) => <Typography color="error">{someError}</Typography>,
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
    useState<Option<Either<string, File>>>(none)
  const { input } = useStyles()
  console.log(imageState)
  const canInsert = pipe(
    imageState,
    Omap(
      Ematch(
        () => false,
        () => true,
      ),
    ),
    OgetOrElse(() => false),
  )
  const onChange: React.ChangeEventHandler<HTMLInputElement> = async ({
    target: { files },
  }) => {
    reset()
    setImageState(none)
    pipe(files, getEitherValidFile, setImageState)
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
      Omap((eitherImageFile) =>
        pipe(
          eitherImageFile,
          TEfromEither,
          TEbindTo("file"),
          TEbind("token", () =>
            TEtryCatch(
              () =>
                getAccessToken(
                  import.meta.env.VITE_APP_LOGTO_API_SECOND_RESOURCE,
                ),
              () => "Authorization failed",
            ),
          ),
          TEbind("uploadResult", ({ file, token }) =>
            TEtryCatch(
              () =>
                uploadImage({
                  variables: { file },
                  context: { headers: { Authorization: `Bearer ${token}` } },
                }),
              () => "Could not upload image to server",
            ),
          ),
          TEbind("url", ({ uploadResult }) =>
            match(uploadResult)
              .with(
                { data: { uploadFile: { url: P.select(P.string) } } },
                (url) => TEright(url),
              )
              .otherwise(() => TEleft("Image url missing")),
          ),
          TEbind("insertImage", ({ url }) => {
            const editorUpdate = editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
              source: url,
              width: 300,
              height: 300,
            })
            return match(editorUpdate)
              .with(true, () => TEright(true))
              .with(false, () => TEleft("Could not insert image into editor"))
              .exhaustive()
          }),
          TEmap(({ file }) => file),
        ),
      ),
      OgetOrElse(() => TEleft("No file is selected")),
      async (uploadTask) => {
        const result = await uploadTask()
        setImageState(some(result))
        setDialogDisplay(false)
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
          <Button type="button"  onClick={onSubmit}>
            Insert Image
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export { ImageUploadDialog }
