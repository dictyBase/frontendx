/**
 * Given an array of strings, return a single string with elements separated by a comma
 * Ex. ["Mike", "Fox", "Tito"] -> "Mike, Fox, Tito"
 * @param array
 * @param initialValue
 * @returns String with elements separated by a comma
 */
const commaSeparate = (array: string[], initialValue?: string): string => {
  return array.reduce(
    (prev, cur, i, _) => {
      if (i === 0) return cur
      return `${prev}, ${cur}`
    },
    initialValue ? initialValue : "",
  )
}

/**
 * Given an array of strings, return a single string with elements separated by a comma and an "&"
 * Ex. ["Mike", "Fox", "Tito"] -> "Mike, Fox, & Tito"
 * @param array
 * @param initialValue
 * @returns String with elements separated by a comma, and the last element with an "&"
 */
const commaSeparateWithAnd = (
  array: string[],
  initialValue?: string,
): string => {
  const len = array.length
  return array.reduce(
    (prev, cur, i, _) => {
      if (i === 0) return cur
      if (i === len - 1) return `${prev} & ${cur}`
      return `${prev}, ${cur}`
    },
    initialValue ? initialValue : "",
  )
}

export { commaSeparate, commaSeparateWithAnd }
