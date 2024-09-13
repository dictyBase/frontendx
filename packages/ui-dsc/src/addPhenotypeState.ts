import { atom } from "jotai"
import { Option, none } from "fp-ts/Option"

const selectedStrainIdAtom = atom<Option<string>>(none)

export { selectedStrainIdAtom }
