/**
 * Given an array of strings, return a single string with elements separated by a comma
 * Ex. ["Mike", "Fox", "Tito"] -> "Mike, Fox, Tito"
 * @param array
 * @param initialValue
 * @returns String with elements separated by a comma
 */
const commaSeparate = (array: string[], initialValue?: string): string =>
  array.reduce((previous, current, index, _) => {
    if (index === 0) return current
    return `${previous}, ${current}`
  }, initialValue || "")

/**
 * Given an array of strings, return a single string with elements separated by a comma and an "&"
 * Ex. ["Mike", "Fox", "Tito"] -> "Mike, Fox & Tito"
 * @param array
 * @param initialValue
 * @returns String with elements separated by a comma, and the last element with an "&"
 */
const commaSeparateWithAnd = (
  array: string[],
  initialValue?: string,
): string => {
  const length_ = array.length
  return array.reduce((previous, current, index, _) => {
    if (index === 0) return current
    if (index === length_ - 1) return `${previous} & ${current}`
    return `${previous}, ${current}`
  }, initialValue || "")
}

export { commaSeparate, commaSeparateWithAnd }
