import { atom } from "jotai"
import { focusAtom } from "jotai-optics"

enum FontFamily {
  INTER_VARIABLE = "Inter Variable",
  ARIAL = "Arial",
  COURIER_NEW = "Courier New",
  GEORGIA = "Georgia",
  TIMES_NEW_ROMAN = "Times New Roman",
  TREBUCHET_MS = "Trebuchet MS",
  VERDANA = "Verdana",
}

const DEFAULT_FONT = FontFamily.INTER_VARIABLE
const DEFAULT_FONT_SIZE = "15px"

const fonts = [
  { name: "Arial", value: FontFamily.ARIAL },
  { name: "Courier New", value: FontFamily.COURIER_NEW },
  { name: "Georgia", value: FontFamily.GEORGIA },
  { name: "Inter Variable", value: FontFamily.INTER_VARIABLE },
  { name: "Times New Roman", value: FontFamily.TIMES_NEW_ROMAN },
  { name: "Trebuchet MS", value: FontFamily.TREBUCHET_MS },
  { name: "Verdana", value: FontFamily.VERDANA },
]

enum BlockTypes {
  PARAGRAPH = "flex-layout",
  HEADING_ONE = "h1",
  HEADING_TWO = "h2",
  HEADING_THREE = "h3",
  HEADING_FOUR = "h4",
  BULLET_LIST = "bullet",
  NUMBERED_LIST = "number",
  QUOTE = "quote",
}

const formatAtom = atom({
  isBold: false,
  isItalic: false,
  isUnderlined: false,
  fontSize: DEFAULT_FONT_SIZE,
  fontColor: "hsl(0, 0%, 0%)",
  fontFamily: DEFAULT_FONT,
  blockType: BlockTypes.PARAGRAPH,
})

const historyAtom = atom({
  canUndo: false,
  canRedo: false,
})

const openAtom = atom({
  insertImage: false,
  uploadFile: false,
  insertTable: false,
  tableActions: false,
  colorPicker: false,
})

const isBoldAtom = focusAtom(formatAtom, (optic) => optic.prop("isBold"))
const isItalicAtom = focusAtom(formatAtom, (optic) => optic.prop("isItalic"))
const isUnderlinedAtom = focusAtom(formatAtom, (optic) =>
  optic.prop("isUnderlined"),
)
const fontFamilyAtom = focusAtom(formatAtom, (optic) =>
  optic.prop("fontFamily"),
)
const fontSizeAtom = focusAtom(formatAtom, (optic) => optic.prop("fontSize"))
const fontColorAtom = focusAtom(formatAtom, (optic) => optic.prop("fontColor"))

const blockTypeAtom = focusAtom(formatAtom, (optic) => optic.prop("blockType"))

const canUndoAtom = focusAtom(historyAtom, (optic) => optic.prop("canUndo"))
const canRedoAtom = focusAtom(historyAtom, (optic) => optic.prop("canRedo"))

const insertTableDialogOpenAtom = focusAtom(openAtom, (optic) =>
  optic.prop("insertTable"),
)
const insertImageDialogOpenAtom = focusAtom(openAtom, (optic) =>
  optic.prop("insertImage"),
)
const uploadFileDialogOpenAtom = focusAtom(openAtom, (optic) =>
  optic.prop("uploadFile"),
)
const tableActionMenuOpenAtom = focusAtom(openAtom, (optic) =>
  optic.prop("tableActions"),
)
const colorPickerOpenAtom = focusAtom(openAtom, (optic) =>
  optic.prop("colorPicker"),
)

export {
  fonts,
  DEFAULT_FONT,
  DEFAULT_FONT_SIZE,
  FontFamily,
  BlockTypes,
  isBoldAtom,
  isItalicAtom,
  isUnderlinedAtom,
  fontFamilyAtom,
  fontSizeAtom,
  fontColorAtom,
  blockTypeAtom,
  canUndoAtom,
  canRedoAtom,
  insertTableDialogOpenAtom,
  insertImageDialogOpenAtom,
  uploadFileDialogOpenAtom,
  tableActionMenuOpenAtom,
  colorPickerOpenAtom,
}
