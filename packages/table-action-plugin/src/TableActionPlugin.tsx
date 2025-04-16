import { createPortal } from "react-dom"
import { useAtomValue } from "jotai"
import { pipe } from "fp-ts/function"
import { MonoidAll as BMonoidAll, match as Bmatch } from "fp-ts/boolean"
import {
  fromNullable as OfromNullable,
  isSome as OisSome,
  match as Omatch,
} from "fp-ts/Option"
import { selectedTableCellNode, tableActionMenuOpenAtom } from "./atomConfigs"
import { usePositionMenuButton } from "./usePositionMenuButton"
import { TableActionMenuButton } from "./TableActionMenuButton"
import { TableActionMenu } from "./TableActionMenu"
import { useSelectCurrentCell } from "./useSelectCurrentCell"

type TableActionPluginProperties = {
  isEditing: boolean
}

/*
 * This plugin decides whether to render a menu button in a table cell. It is also reponsible for rendering the Table Action Menu.
 */
const TableActionPlugin = ({ isEditing }: TableActionPluginProperties) => {
  const currentTableCellNode = useAtomValue(selectedTableCellNode)
  const isMenuOpen = useAtomValue(tableActionMenuOpenAtom)
  const menuButtonReference = usePositionMenuButton()
  useSelectCurrentCell()

  const isCellSelected = pipe(currentTableCellNode, OfromNullable, OisSome)
  return pipe(
    BMonoidAll.concat(isEditing, isCellSelected),
    Bmatch(
      () => <></>,
      () => (
        <>
          {createPortal(
            <TableActionMenuButton menuButtonReference={menuButtonReference} />,
            document.body,
          )}
          {pipe(
            menuButtonReference.current,
            OfromNullable,
            Omatch(
              () => <></>,
              (anchorElement) => (
                <TableActionMenu
                  anchorElement={anchorElement}
                  isMenuOpen={isMenuOpen}
                />
              ),
            ),
          )}
        </>
      ),
    ),
  )
}

export { TableActionPlugin }
