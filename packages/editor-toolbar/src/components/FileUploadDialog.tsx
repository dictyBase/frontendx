import { Dialog } from "@mui/material"
import { FormProvider } from "react-hook-form"
import { useUploadFileMutation } from "dicty-graphql-schema"
import { useSetAtom } from "jotai"
import { match, P } from "ts-pattern"
import { uploadFileDialogOpenAtom } from "../context/atomConfigs"
import { InsertUrl } from "./InsertUrl"
import { SelectAndUpload } from "./SelectAndUpload"
import { useValidateSuggestedFilename } from "./helpers/fileUploadHelpers"

type FileUploadDialogProperties = {
  open: boolean
}

const FileUploadDialog = ({ open }: FileUploadDialogProperties) => {
  const [uploadFileMutation, { data, loading, reset }] = useUploadFileMutation()
  const setDialogDisplay = useSetAtom(uploadFileDialogOpenAtom)
  const methods = useValidateSuggestedFilename()

  const handleClose = () => {
    if (loading) return
    setDialogDisplay(false)
  }

  const handleClearForm = () => {
    reset()
    methods.reset()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <FormProvider {...methods}>
        {match(data)
          .with({ uploadFile: { url: P.select(P.string) } }, (url) => (
            <InsertUrl
              handleClose={handleClose}
              handleClearForm={handleClearForm}
              fileUrl={url}
            />
          ))
          .otherwise(() => (
            <SelectAndUpload
              mutationFunction={uploadFileMutation}
              loading={loading}
            />
          ))}
      </FormProvider>
    </Dialog>
  )
}

export { FileUploadDialog }
