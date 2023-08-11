import { useAtom, useAtomValue } from "jotai"
import { isFullAtom } from "../state"
import { AddToCartButton } from "./AddToCartButton"

const AddToCartButtonHandler = ({ item, inStock }) => {
  const isFull = useAtomValue(isFullAtom)
}
