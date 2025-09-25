import { useAtomValue } from "jotai"
import type { WritableAtom } from "jotai"
import type { SetStateAction } from "react"
import { useToolbarItemStyles } from "./useToolbarItemStyles"

const useActiveClass = (
  atomConfig: WritableAtom<boolean, SetStateAction<boolean>[], void>,
) => {
  const active = useAtomValue(atomConfig)
  const styles = useToolbarItemStyles()
  return active ? { ...styles.root, ...styles.active } : styles.root
}

export { useActiveClass }
