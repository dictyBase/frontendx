import { Button, Dialog } from "@mui/material"
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined"
import { useAtom } from "jotai"
import { useToolbarItemStyles } from "../hooks/useToolbarItemStyles"
import { insertTableDialogOpenAtom } from "../context/atomConfigs"
import { TableDialogContents } from "./TableDialogContents"

const InsertTableButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useAtom(insertTableDialogOpenAtom)
  const { spaced } = useToolbarItemStyles()

  return (
    <>
      <Button
        className={spaced}
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
