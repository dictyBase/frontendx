import { useAtomValue } from "jotai"
import type { WritableAtom } from "jotai"
import type { SetStateAction } from "react"
import useButtonStyles from "./useToolbarItemStyles"

const useActiveClass = (
  atomConfig: WritableAtom<boolean, SetStateAction<boolean>[], void>,
) => {
  const active = useAtomValue(atomConfig)
  const classes = useButtonStyles()
  return active ? `${classes.root} ${classes.active}` : classes.root
}

export default useActiveClass
