import { atom } from "jotai"

export type ButtonStates = "NORMAL" | "LOADING" | "DONE" | "ERROR"

export const ButtonStateAtom = atom<ButtonStates>("NORMAL")
export const dialogOpenAtom = atom(false)
