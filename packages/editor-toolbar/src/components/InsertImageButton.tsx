import { Button, Dialog } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import { useAtom } from "jotai"
import { insertImageDialogOpenAtom } from "../context/atomConfigs"
import ImageDialogContents from "./ImageDialogContents"

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
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <ImageDialogContents />
      </Dialog>
    </>
  )
}

export default InsertImageButton
