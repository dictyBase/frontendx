import { Button } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import { useAtom } from "jotai"
import { insertImageDialogOpenAtom } from "../context/atomConfigs"
import { ImageUploadDialog } from "./ImageUploadDialog"

type InsertImageButtonProperties = {
  handleImageUpload: (file: File) => Promise<string>
}

const InsertImageButton = ({
  handleImageUpload,
}: InsertImageButtonProperties) => {
  const [isDialogOpen, setIsDialogOpen] = useAtom(insertImageDialogOpenAtom)

  return (
    <>
      <Button
        variant="text"
        onClick={() => setIsDialogOpen(true)}
        startIcon={<AddIcon />}>
        Image
      </Button>
      <ImageUploadDialog
        open={isDialogOpen}
        handleImageUpload={handleImageUpload}
      />
    </>
  )
}

export { InsertImageButton }
