import { atom } from "jotai"


export const ButtonStateAtom = atom<ButtonStates>("NORMAL")
export const ImageDimensionsAtom = atom({ width: 500, height: 500 })
export const dialogOpenAtom = atom(false)
export const isResizingAtom = atom(false)
