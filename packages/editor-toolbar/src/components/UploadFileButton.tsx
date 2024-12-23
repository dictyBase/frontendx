import { Button } from "@material-ui/core"
import AttachFileIcon from "@material-ui/icons/AttachFile"
import { useAtom } from "jotai"
import { uploadFileDialogOpenAtom } from "../context/atomConfigs"
import { FileUploadDialog } from "./FileUploadDialog"

const UploadFileButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useAtom(uploadFileDialogOpenAtom)

  return (
    <>
      <Button
        variant="text"
        onClick={() => setIsDialogOpen(true)}
        startIcon={<AttachFileIcon />}>
        File
      </Button>
      <FileUploadDialog open={isDialogOpen} />
    </>
  )
}

export { UploadFileButton }
