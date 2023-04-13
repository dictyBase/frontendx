import { atom } from "jotai"
import { TableCellNode } from "@lexical/table"

export const tableActionMenuOpenAtom = atom(false)
export const selectedTableCellNode = atom<TableCellNode | undefined>(undefined)
