/**
 * Given an array of strings, return a single string with elements separated by a comma
 * Ex. ["Mike", "Fox", "Tito"] -> "Mike, Fox, Tito"
 * @param array
 * @param initialValue
 * @returns String with elements separated by a comma
 */
const commaSeparate = (array: string[]): string => array.join(", ")
/**
 * Given an array of strings, return a single string with elements separated by a comma and an "&"
 * Ex. ["Mike", "Fox", "Tito"] -> "Mike, Fox & Tito"
 * @param array
 * @param initialValue
 * @returns String with elements separated by a comma, and the last element with an "&"
 */
const commaSeparateWithAnd = (array: string[]): string => {
  if (array.length === 0) return ""
  if (array.length === 1) return array[0]
  const init = array.slice(0, -1)
  const last = array.at(-1)
  return `${commaSeparate(init)} & ${last}`
}

export { commaSeparate, commaSeparateWithAnd }
