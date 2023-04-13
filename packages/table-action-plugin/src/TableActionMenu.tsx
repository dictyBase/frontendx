import { Divider, Menu, MenuItem } from "@material-ui/core"
import { useSetAtom } from "jotai"
import {
  useInsertRow,
  useInsertColumn,
  useDeleteRow,
  useDeleteColumn,
  useDeleteTable,
  useDisableFunctions,
} from "./useTableActions"
import { tableActionMenuOpenAtom } from "./atomConfigs"

type TableActionMenuProperties = {
  anchorElement: HTMLElement
  isMenuOpen: boolean
}

const TableActionMenu = ({
  anchorElement,
  isMenuOpen,
}: TableActionMenuProperties) => {
  const setIsOpen = useSetAtom(tableActionMenuOpenAtom)
  const { insertRowAbove, insertRowBelow } = useInsertRow()
  const { insertColumnLeft, insertColumnRight } = useInsertColumn()
  const { deleteRowDisabled, deleteColumnDisabled } = useDisableFunctions()
  const deleteColumn = useDeleteColumn()
  const deleteRow = useDeleteRow()
  const deleteTable = useDeleteTable()
  return (
    <Menu
      open={isMenuOpen}
      // getContentAnchorEl needs to be set to null for anchorOrigin.vertical to have affect
      // eslint-disable-next-line unicorn/no-null
      getContentAnchorEl={null}
      anchorEl={anchorElement}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      onClose={() => setIsOpen(false)}>
      <MenuItem onClick={insertRowAbove}>Insert Row Above</MenuItem>
      <MenuItem onClick={insertRowBelow}> Insert Row Below</MenuItem>
      <Divider />
      <MenuItem onClick={insertColumnLeft}>Insert Column Left</MenuItem>
      <MenuItem onClick={insertColumnRight}>Insert Column Right</MenuItem>
      <Divider />
      <MenuItem onClick={deleteRow} disabled={deleteRowDisabled}>
        Delete Row
      </MenuItem>
      <MenuItem onClick={deleteColumn} disabled={deleteColumnDisabled}>
        Delete Column
      </MenuItem>
      <MenuItem onClick={deleteTable}> Delete Table </MenuItem>
    </Menu>
  )
}

export default TableActionMenu
