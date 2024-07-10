import { atom } from "jotai"
import { Option, none } from "fp-ts/Option"

const contentIdAtom = atom<Option<string>>(none)

export { contentIdAtom }
