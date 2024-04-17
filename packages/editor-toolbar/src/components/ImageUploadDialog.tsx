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
import { FetchResult } from "@apollo/client"
import { useUploadFileMutation, UploadFileMutation } from "dicty-graphql-schema"
import { useLogto } from "@logto/react"
import { useSetAtom } from "jotai"
import { pipe } from "fp-ts/function"
import { head as Ahead } from "fp-ts/Array"
import {
  left as Eleft,
  right as Eright,
  fromOption as EfromOption,
  map as Emap,
  filterOrElse as EfilterOrElse,
} from "fp-ts/Either"
import {
  left as TEleft,
  right as TEright,
  fromOption as TEfromOption,
  map as TEmap,
  filterOrElse as TEfilterOrElse,
  flatMap as TEflatMap,
  tryCatch as TEtryCatch,
} from "fp-ts/TaskEither"
import { match, P } from "ts-pattern"
import { INSERT_IMAGE_COMMAND } from "image-plugin"
import { insertImageDialogOpenAtom } from "../context/atomConfigs"

const useStyles = makeStyles({ input: { display: "flex" } })

const validateFile = (file: File) =>
  match(file)
    .when(
      ({ size }) => size > 500_000,
      () =>
        Eleft({
          message:
            "The chosen image is too large. It must be smaller than 0.5MB",
        }),
    )
    .otherwise((file) => Eright(file))

const fileSizePredicate = (file: File) => file.size > 500_000

const mutationResultToTaskEither = (result: FetchResult<UploadFileMutation>) =>
  match(result)
    .with({ data: { uploadFile: { url: P.select(P.string) } } }, (url) =>
      TEright(url),
    )
    .with({ errors: P.not(undefined) }, () => TEleft("Something went wrong"))
    .otherwise(() => TEleft("Unexpected Error"))

type ImageUploadDialogProperties = {
  handleImageUpload: (file: File) => Promise<string>
  open: boolean
}

const ImageUploadDialog = ({ open }: ImageUploadDialogProperties) => {
  const { getAccessToken } = useLogto()
  const [editor] = useLexicalComposerContext()
  const setDialogDisplay = useSetAtom(insertImageDialogOpenAtom)
  const [uploadImage, { error, loading, data }] = useUploadFileMutation()
  const { input } = useStyles()

  const onChange: React.ChangeEventHandler<HTMLInputElement> = async ({
    target: { validity, files },
  }) => {
    if (!validity.valid || !files) {
      return
    }
    const fileUpload = pipe(
      Array.from(files),
      Ahead,
      TEfromOption(() => "No file selected"),
      TEfilterOrElse(
        fileSizePredicate,
        () => "The chosen image is too large. It must be smaller than 0.5MB",
      ),
      TEflatMap((file: File) =>
        TEtryCatch(
          () => {
            const token = getAccessToken(
              import.meta.env.VITE_APP_LOGTO_API_SECOND_RESOURCE,
            )
            const a = uploadImage({
              variables: { file },
              context: { headers: { Authorization: `Bearer ${token}` } },
            })
            return a
          },
          () => "Could not upload image to server",
        ),
      ),
      TEflatMap(mutationResultToTaskEither),
    )

    //    const otherValidationErrors = validateFile(files[0])
    //    if (isSome(otherValidationErrors)) {
    //      return
    //    }
    //    const token = await getAccessToken(
    //      import.meta.env.VITE_APP_LOGTO_API_SECOND_RESOURCE,
    //    )
    //    uploadImage({
    //      variables: { file: files[0] },
    //      context: { headers: { Authorization: `Bearer ${token}` } },
    //    })
  }

  const handleClose = () => {
    if (loading) return
    setDialogDisplay(false)
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
        <DialogActions>
          {/*
          {pipe(
            error,
            Omap(({ errorMessage }) => (
              <Typography color="error">{errorMessage}</Typography>
            )),
            OgetOrElse(() => <></>),
          )}
          */}
          {loading ? <CircularProgress /> : <></>}
          <Button type="button" onClick={onClick}>
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export { ImageUploadDialog }
