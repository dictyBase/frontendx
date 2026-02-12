import { useState } from "react"
import { useFormContext } from "react-hook-form"
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
} from "fp-ts/Option"
import { Upload } from "./Upload"
import { FileSelect } from "./FileSelect"
import { ErrorState, getFileValidationError } from "./helpers/fileUploadHelpers"

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
  const { setValue } = useFormContext()

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
    // Set the error state of the file.
    pipe(selected, OflatMap(getFileValidationError), setFileError)
    // Set the file state.
    setSelectedFile(selected)
    pipe(
      selected,
      Omatch(
        () => {},
        ({ name }) => setValue("suggestedFilename", name),
      ),
    )
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
          setFileError={setFileError}
          onFileChange={onFileChange}
        />
      ),
    ),
  )
}

export { SelectAndUpload }
