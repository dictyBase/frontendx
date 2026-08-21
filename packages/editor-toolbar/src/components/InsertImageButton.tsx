import { Button } from "@mui/material"
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined"
import { useAtom } from "jotai"
import { insertImageDialogOpenAtom } from "../context/atomConfigs"
import { ImageUploadDialog } from "./ImageUploadDialog"

const InsertImageButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useAtom(insertImageDialogOpenAtom)

  return (
    <>
      <Button
        color="inherit"
        variant="text"
        onClick={() => setIsDialogOpen(true)}
        startIcon={<ImageOutlinedIcon />}>
        Image
      </Button>
      <ImageUploadDialog open={isDialogOpen} />
    </>
  )
}

export { InsertImageButton }
