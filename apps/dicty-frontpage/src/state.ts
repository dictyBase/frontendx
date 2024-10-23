import { atom } from "jotai"
import { Option, none } from "fp-ts/Option"

const contentIdAtom = atom<Option<string>>(none)

// News Content IDs
const selectedNewsArticlesAtom = atom<Array<string>>([])

export { contentIdAtom, selectedNewsArticlesAtom }
