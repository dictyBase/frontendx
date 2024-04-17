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
  fromNullable as OfromNullable,
  bindTo as ObindTo,
  bind as Obind,
  let as Olet,
  none,
  some,
  Option,
  match as Omatch,
} from "fp-ts/Option"
import {
  fromOption as EfromOption,
  map as Emap,
  filterOrElse as EfilterOrElse,
  match as Ematch,
} from "fp-ts/Either"
import { match, P } from "ts-pattern"
import { INSERT_IMAGE_COMMAND } from "image-plugin"
import { insertImageDialogOpenAtom } from "../context/atomConfigs"

const useStyles = makeStyles({ input: { display: "flex" } })

const fileSizePredicate = (file: File) => file.size < 1_000_000

type ImageUploadDialogProperties = {
  handleImageUpload: (file: File) => Promise<string>
  open: boolean
}

const getEitherValidFile = (files: FileList | null) =>
  pipe(
    files,
    OfromNullable,
    ObindTo("fileList"),
    Olet("presentFiles", ({ fileList }) => [ ...fileList ]),
    Obind("selectedFile", ({ presentFiles }) => Ahead(presentFiles)),
    EfromOption(() => "No file selected"),
    Emap(({ selectedFile }) => selectedFile),
    EfilterOrElse(
      fileSizePredicate,
      () => "The chosen image is too large. It must be smaller than 1MB",
    ),
  )

const renderValidationError = (error: Option<string>) =>
  pipe(
    error,
    Omatch(
      () => <></>,
      (someError) => <Typography color="error">{someError}</Typography>,
    ),
  )

const renderUploadStatus = ({
  loading,
  error,
}: {
  loading: boolean
  error: { message: string } | undefined
}) =>
  match({ loading, error })
    .with({ error: P.not(undefined) }, () => (
      <Typography color="error">Could not upload file to server</Typography>
    ))
    .with({ loading: true }, () => <CircularProgress />)
    .otherwise(() => <></>)

const ImageUploadDialog = ({ open }: ImageUploadDialogProperties) => {
  const { getAccessToken } = useLogto()
  const [editor] = useLexicalComposerContext()
  const setDialogDisplay = useSetAtom(insertImageDialogOpenAtom)
  const [uploadImage, { error, loading, data, reset }] = useUploadFileMutation()
  const [fileValidationError, setValidationError] =
    useState<Option<string>>(none)
  const { input } = useStyles()

  const canInsert = match({ error, loading, data })
    .with({ data: { uploadFile: { url: P.string } } }, () => true)
    .otherwise(() => false)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = async ({
    target: { files },
  }) => {
    reset()
    setValidationError(none)
    pipe(
      files,
      getEitherValidFile,
      Ematch(
        (validationError) => {
          setValidationError(some(validationError))
        },
        async (file) => {
          const token = await getAccessToken(
            import.meta.env.VITE_APP_LOGTO_API_SECOND_RESOURCE,
          )
          uploadImage({
            variables: { file },
            context: { headers: { Authorization: `Bearer ${token}` } },
          })
        },
      ),
    )
  }

  const handleClose = () => {
    if (loading) return
    setDialogDisplay(false)
    setValidationError(none)
    reset()
  }

  const onClick = () => {
    match({ data })
      .with({ data: { uploadFile: { url: P.select(P.string) } } }, (url) => {
        editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
          source: url,
          width: 300,
          height: 300,
        })
        handleClose()
      })
      .otherwise(() => {})
    reset()
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
        {renderValidationError(fileValidationError)}
        <DialogActions>
          {renderUploadStatus({ error, loading })}
          <Button type="button" disabled={!canInsert} onClick={onClick}>
            Insert Image
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export { ImageUploadDialog }
