import { Button, Dialog } from "@mui/material"
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined"
import { useAtom } from "jotai"
import { insertTableDialogOpenAtom } from "../context/atomConfigs"
import { TableDialogContents } from "./TableDialogContents"

const InsertTableButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useAtom(insertTableDialogOpenAtom)

  return (
    <>
      <Button
        color="inherit"
        variant="text"
        onClick={() => setIsDialogOpen(true)}
        startIcon={<TableChartOutlinedIcon />}>
        Table
      </Button>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <TableDialogContents />
      </Dialog>
    </>
  )
}

export { InsertTableButton }
