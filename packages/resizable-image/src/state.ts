import { atom } from "jotai"
import { focusAtom } from "jotai-optics"
import { ALIGNMENT } from "./types"

const defaultImageProperties = {
  dimensions: { width: 500, height: 500 },
  alignment: ALIGNMENT.LEFT,
}

const imageAtom = atom(defaultImageProperties)

const imageDimensionsAtom = focusAtom(imageAtom, (optic) =>
  optic.prop("dimensions"),
)
const imageAlignmentAtom = focusAtom(imageAtom, (optic) =>
  optic.prop("alignment"),
)
const dialogOpenAtom = atom(false)
const isResizingAtom = atom(false)

export {
  imageDimensionsAtom,
  dialogOpenAtom,
  isResizingAtom,
  imageAlignmentAtom,
}
