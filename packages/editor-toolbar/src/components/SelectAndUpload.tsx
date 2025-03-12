import { useState } from "react"
import { UploadFileMutationFn } from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import { head as Ahead } from "fp-ts/Array"
import {
  Option,
  none,
  map as Omap,
  flatMap as OflatMap,
  match as Omatch,
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { Upload } from "./Upload"
import { FileSelect } from "./FileSelect"
import {
  ErrorState,
  useValidateUploadName,
  getFileValidationError,
} from "./fileUploadHelpers"

type SelectAndUploadProperties = {
  loading: boolean
  mutationFunction: UploadFileMutationFn
}

const SelectAndUpload = ({
  loading,
  mutationFunction,
}: SelectAndUploadProperties) => {
  const [selectedFile, setSelectedFile] = useState<Option<File>>(none)
  const [fileError, setFileError] = useState<Option<ErrorState>>(none)
  const methods = useValidateUploadName()
  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { files },
  }) => {
    // Get the file selected by the user.
    const selected = pipe(
      files,
      OfromNullable,
      Omap((someFiles) => [...someFiles]),
      OflatMap(Ahead),
    )
    pipe(
      selected,
      Omap(({ name }) => name),
      OgetOrElse(() => ""),
      (uploadName) => {
        methods.setValue("uploadName", uploadName)
      },
    )
    // Set the error state of the file.
    pipe(selected, OflatMap(getFileValidationError), setFileError)
    // Set the file state.
    setSelectedFile(selected)
  }
  return pipe(
    selectedFile,
    Omatch(
      () => <FileSelect fileError={fileError} onFileChange={onFileChange} />,
      (file) => (
        <Upload
          loading={loading}
          mutationFunction={mutationFunction}
          selectedFile={file}
          fileError={fileError}
          setSelectedFile={setSelectedFile}
          setFileError={setFileError}
          validationMethods={methods}
          onFileChange={onFileChange}
        />
      ),
    ),
  )
}

export { SelectAndUpload }
