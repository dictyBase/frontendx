import { Button } from "@material-ui/core"
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined'
import { useAtom } from "jotai"
import { insertImageDialogOpenAtom } from "../context/atomConfigs"
import { ImageUploadDialog } from "./ImageUploadDialog"

const InsertImageButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useAtom(insertImageDialogOpenAtom)

  return (
    <>
      <Button
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
