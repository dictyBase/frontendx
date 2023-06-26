import { type Cart } from "../types"
import { toCurrencyString } from "./toCurrencyString"

const getCartTotal = (items: Cart["strainItems"]) => {
  const total = items
    .map((item) => Number(item.fee))
    .reduce((accumulator, value) => accumulator + value)
  return toCurrencyString(total)
}

export { getCartTotal }
