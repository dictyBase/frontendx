import { atom } from "jotai"
import { focusAtom } from "jotai-optics"

export type ButtonStates = "NORMAL" | "LOADING" | "DONE" | "ERROR"

export enum FontFamily {
  ARIAL = "Arial",
  COURIER_NEW = "Courier New",
  GEORGIA = "Georgia",
  TIMES_NEW_ROMAN = "Times New Roman",
  TREBUCHET_MS = "Trebuchet MS",
  VERDANA = "Verdana",
}

export enum BlockTypes {
  PARAGRAPH = "flex-layout",
  HEADING_ONE = "h1",
  HEADING_TWO = "h2",
  HEADING_THREE = "h3",
  HEADING_FOUR = "h4",
  BULLET_LIST = "bullet",
  NUMBERED_LIST = "number",
  QUOTE = "quote",
}

const FontSizes = [
  "10px",
  "11px",
  "12px",
  "13px",
  "14px",
  "15px",
  "16px",
  "17px",
  "18px",
  "19px",
  "20px",
]

export const formatAtom = atom({
  isBold: false,
  isItalic: false,
  isUnderlined: false,
  fontSize: FontSizes[5],
  fontColor: "hsl(0, 0%, 0%)",
  fontFamily: FontFamily.ARIAL,
  blockType: BlockTypes.PARAGRAPH,
  isLink: false,
})
export const isBoldAtom = focusAtom(formatAtom, (optic) => optic.prop("isBold"))
export const isItalicAtom = focusAtom(formatAtom, (optic) =>
  optic.prop("isItalic"),
)
export const isUnderlinedAtom = focusAtom(formatAtom, (optic) =>
  optic.prop("isUnderlined"),
)
export const fontFamilyAtom = focusAtom(formatAtom, (optic) =>
  optic.prop("fontFamily"),
)
export const fontSizeAtom = focusAtom(formatAtom, (optic) =>
  optic.prop("fontSize"),
)
export const fontColorAtom = focusAtom(formatAtom, (optic) =>
  optic.prop("fontColor"),
)

export const blockTypeAtom = focusAtom(formatAtom, (optic) =>
  optic.prop("blockType"),
)

export const isLinkAtom = focusAtom(formatAtom, (optic) => optic.prop("isLink"))

const historyAtom = atom({
  canUndo: false,
  canRedo: false,
})
export const canUndoAtom = focusAtom(historyAtom, (optic) =>
  optic.prop("canUndo"),
)
export const canRedoAtom = focusAtom(historyAtom, (optic) =>
  optic.prop("canRedo"),
)

export const openAtom = atom({
  insertImage: false,
  insertTable: false,
  tableActions: false,
  colorPicker: false,
})

export const insertTableDialogOpenAtom = focusAtom(openAtom, (optic) =>
  optic.prop("insertTable"),
)
export const insertImageDialogOpenAtom = focusAtom(openAtom, (optic) =>
  optic.prop("insertImage"),
)
export const tableActionMenuOpenAtom = focusAtom(openAtom, (optic) =>
  optic.prop("tableActions"),
)
export const colorPickerOpenAtom = focusAtom(openAtom, (optic) =>
  optic.prop("colorPicker"),
)
