import { Button } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
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
        startIcon={<AddIcon />}>
        File
      </Button>
      <FileUploadDialog open={isDialogOpen} />
    </>
  )
}

export { UploadFileButton }
