import { createPortal } from "react-dom"
import { useAtomValue } from "jotai"
import { selectedTableCellNode, tableActionMenuOpenAtom } from "./atomConfigs"
import usePositionMenuButton from "./usePositionMenuButton"
import TableActionMenuButton from "./TableActionMenuButton"
import TableActionMenu from "./TableActionMenu"
import useSelectCurrentCell from "./useSelectCurrentCell"

const TableActionPlugin = () => {
  const currentTableCellNode = useAtomValue(selectedTableCellNode)
  const isMenuOpen = useAtomValue(tableActionMenuOpenAtom)
  const menuButtonReference = usePositionMenuButton()
  useSelectCurrentCell()

  if (currentTableCellNode)
    return (
      <>
        {createPortal(
          <TableActionMenuButton menuButtonReference={menuButtonReference} />,
          document.body,
        )}
        {menuButtonReference.current ? (
          <TableActionMenu
            anchorElement={menuButtonReference.current}
            isMenuOpen={isMenuOpen}
          />
        ) : undefined}
      </>
    )

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>
}

export default TableActionPlugin
