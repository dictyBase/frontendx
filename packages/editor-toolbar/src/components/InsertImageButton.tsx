import { Button } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
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
        startIcon={<AddIcon />}>
        Image
      </Button>
      <ImageUploadDialog open={isDialogOpen} />
    </>
  )
}

export { InsertImageButton }
