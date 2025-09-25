import { useState } from "react"
import { Dialog } from "@mui/material"
import { useUploadFileMutation } from "dicty-graphql-schema"
import { useLogto } from "@logto/react"
import { useSetAtom } from "jotai"
import { match, P } from "ts-pattern"
import { pipe } from "fp-ts/function"
import { head as Ahead } from "fp-ts/Array"
import { mapLeft as EmapLeft } from "fp-ts/Either"
import {
  some,
  none,
  Option,
  fromNullable as OfromNullable,
  map as Omap,
  flatMap as OflatMap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { uploadFileDialogOpenAtom } from "../context/atomConfigs"
import {
  getFileValidationError,
  ErrorState,
  isValidFile,
} from "./fileUploadHelpers"
import { InsertUrl } from "./InsertUrl"
import { Upload } from "./Upload"
import { createFileUploadFunction } from "./createUploadFileFunction"

type FileUploadDialogProperties = {
  open: boolean
}

const FileUploadDialog = ({ open }: FileUploadDialogProperties) => {
  const [selectedFile, setSelectedFile] = useState<Option<File>>(none)
  const [fileError, setFileError] = useState<Option<ErrorState>>(none)
  const fileName = pipe(
    selectedFile,
    Omap(({ name }) => name),
  )
  const canSubmit = pipe(
    selectedFile,
    Omap(isValidFile),
    OgetOrElse(() => false),
  )

  const { getAccessToken } = useLogto()
  const [uploadFile, { data, loading, reset }] = useUploadFileMutation()

  const setDialogDisplay = useSetAtom(uploadFileDialogOpenAtom)

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = async ({
    target: { files },
  }) => {
    reset()
    // Get the file selected by the user.
    const selected = pipe(
      files,
      OfromNullable,
      Omap((someFiles) => [...someFiles]),
      OflatMap(Ahead),
    )
    // Set the error state of the file.
    pipe(selected, OflatMap(getFileValidationError), setFileError)
    // Set the file state.
    setSelectedFile(selected)
  }

  const handleClose = () => {
    if (loading) return
    setDialogDisplay(false)
  }

  const handleClearForm = () => {
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
          <InsertUrl
            handleClose={handleClose}
            handleClearForm={handleClearForm}
            fileUrl={url}
          />
        ))
        .otherwise(() => (
          <Upload
            fileName={fileName}
            fileError={fileError}
            loading={loading}
            canSubmit={canSubmit}
            onFileChange={onFileChange}
            onSubmit={onSubmit}
          />
        ))}
    </Dialog>
  )
}

export { FileUploadDialog }
