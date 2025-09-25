import { Button } from "@mui/material"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import { useAtom } from "jotai"
import { uploadFileDialogOpenAtom } from "../context/atomConfigs"
import { FileUploadDialog } from "./FileUploadDialog"

const UploadFileButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useAtom(uploadFileDialogOpenAtom)

  return (
    <>
      <Button
        sx={(theme) => ({
          color: theme.palette.text.primary,
        })}
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
