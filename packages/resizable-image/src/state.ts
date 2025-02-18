import { atom } from "jotai"

const ImageDimensionsAtom = atom({ width: 500, height: 500 })
const dialogOpenAtom = atom(false)
const isResizingAtom = atom(false)

export { ImageDimensionsAtom, dialogOpenAtom, isResizingAtom }
