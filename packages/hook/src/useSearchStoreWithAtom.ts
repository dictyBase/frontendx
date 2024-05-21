import { atom, useAtom } from "jotai"
import { focusAtom } from "jotai-optics"
import { selectAtom, useResetAtom, atomWithReset } from "jotai/utils"

interface Chip {
  label: string
  active: boolean
}

interface State {
  options: string[]
  chips: Chip[]
  input: string
  tag: boolean
}

const initialState: State = {
  tag: false,
  input: "",
  options: [],
  chips: [],
}

const dataAtom = atom<State>(initialState)
const inputAtom = focusAtom(dataAtom, (optic) => optic.prop("input"))
const tagAtom = focusAtom(dataAtom, (optic) => optic.prop("tag"))
const optionAtom = focusAtom(dataAtom, (optic) => optic.prop("options"))
const optionLastAtom = atom((get) => get(optionAtom).at(-1))
const chipAtom = selectAtom(dataAtom, (data) => data.chips)
const appendChipAtom = focusAtom(dataAtom, (optic) =>
  // @ts-expect-error
  optic.prop("chips").appendTo(),
)
const activeChipAtom = focusAtom(dataAtom, (optic) =>
  optic.prop("chips").find((c) => c.active),
)
const inactiveChipAtom = focusAtom(dataAtom, (optic) =>
  optic
    .prop("chips")
    .elems()
    .when((c) => !c.active),
)

export function useSearchStoreAtoms() {
  const [tag, setTag] = useAtom(tagAtom)
  const [input, setInput] = useAtom(inputAtom)
  const resetInput = useResetAtom(atomWithReset(inputAtom))
  const [options, setOptions] = useAtom(optionAtom)
  const [lastOption] = useAtom(optionLastAtom)
  const [chips] = useAtom(chipAtom)
  const [, addChip] = useAtom(appendChipAtom)
  const [activeChip, setActiveChipStatus] = useAtom(activeChipAtom)
  const [inactiveChips, setInactiveChip] = useAtom(inactiveChipAtom)
  const toggleActiveChip = (label: string) => {
    setActiveChipStatus({ label, active: false })
  }
  const addActiveChip = (label: string) => {
    addChip({ label, active: true })
  }
  const addUniqInactiveChip = (label: string) => {
    const hasSome = inactiveChips.some((c) => c.label !== label)
    if (hasSome) {
      addChip({ label, active: false })
    }
  }
  return {
    tag,
    setTag,
    input,
    setInput,
    resetInput,
    options,
    setOptions,
    lastOption,
    chips,
    activeChip,
    toggleActiveChip,
    addActiveChip,
    addUniqInactiveChip,
    inactiveChips,
    setInactiveChip,
  }
}
