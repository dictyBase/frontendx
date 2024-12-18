import { useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { Dialog } from "@material-ui/core"
import { useUploadFileMutation } from "dicty-graphql-schema"
import { useLogto } from "@logto/react"
import { useSetAtom } from "jotai"
import { match, P } from "ts-pattern"
import { pipe } from "fp-ts/function"
import { MonoidAll as BMonoidAll } from "fp-ts/boolean"
import { head as Ahead } from "fp-ts/Array"
import { mapLeft as EmapLeft } from "fp-ts/Either"
import {
  isSome,
  isNone,
  some,
  none,
  Option,
  fromNullable as OfromNullable,
  map as Omap,
  flatMap as OflatMap,
} from "fp-ts/Option"
import { uploadFileDialogOpenAtom } from "../context/atomConfigs"
import { getFileError, ErrorState } from "./fileUploadHelpers"
import { InsertUrl } from "./InsertUrl"
import { Upload } from "./Upload"
import { createFileUploadFunction } from "./createUploadFileFunction"

type FileUploadDialogProperties = {
  open: boolean
}

const FileUploadDialog = ({ open }: FileUploadDialogProperties) => {
  const [selectedFile, setSelectedFile] = useState<Option<File>>(none)
  const [fileError, setFileError] = useState<Option<ErrorState>>(none)
  const canSubmit = BMonoidAll.concat(isSome(selectedFile), isNone(fileError))

  const { getAccessToken } = useLogto()
  const [uploadFile, { data, loading, reset }] = useUploadFileMutation()

  const setDialogDisplay = useSetAtom(uploadFileDialogOpenAtom)

  const [editor] = useLexicalComposerContext()

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async ({
    target: { files },
  }) => {
    reset()
    // get the file selected by the user
    const selected = pipe(
      files,
      OfromNullable,
      Omap((someFiles) => [...someFiles]),
      OflatMap(Ahead),
    )
    // set the error state of the file
    pipe(selected, OflatMap(getFileError), setFileError)
    // set the file state
    setSelectedFile(selected)
  }

  const handleClose = () => {
    if (loading) return
    setDialogDisplay(false)
    setSelectedFile(none)
    setFileError(none)
    reset()
  }

  const onSubmit = async () => {
    const uploadFunction = createFileUploadFunction(
      selectedFile,
      uploadFile,
      getAccessToken,
    )
    pipe(
      await uploadFunction(),
      EmapLeft((error) => {
        setFileError(some(error))
      }),
    )
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      {match(data)
        .with({ uploadFile: { url: P.select(P.string) } }, (url) => (
          <InsertUrl fileUrl={url} />
        ))
        .otherwise(() => (
          <Upload
            loading={loading}
            canSubmit={canSubmit}
            fileError={fileError}
            onFileChange={onFileChange}
            onSubmit={onSubmit}
          />
        ))}
    </Dialog>
  )
}

export { FileUploadDialog }
