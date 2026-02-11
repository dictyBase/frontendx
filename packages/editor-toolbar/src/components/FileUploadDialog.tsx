import { Dialog } from "@mui/material"
import { useUploadFileMutation } from "dicty-graphql-schema"
import { useSetAtom } from "jotai"
import { match, P } from "ts-pattern"
import { uploadFileDialogOpenAtom } from "../context/atomConfigs"
import { InsertUrl } from "./InsertUrl"
import { SelectAndUpload } from "./SelectAndUpload"

type FileUploadDialogProperties = {
  open: boolean
}

const FileUploadDialog = ({ open }: FileUploadDialogProperties) => {
  const [uploadFileMutation, { data, loading, reset }] = useUploadFileMutation()

  const setDialogDisplay = useSetAtom(uploadFileDialogOpenAtom)

  const handleClose = () => {
    if (loading) return
    setDialogDisplay(false)
  }

  const handleClearForm = () => {
    reset()
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
          <SelectAndUpload
            mutationFunction={uploadFileMutation}
            loading={loading}
          />
        ))}
    </Dialog>
  )
}

export { FileUploadDialog }
