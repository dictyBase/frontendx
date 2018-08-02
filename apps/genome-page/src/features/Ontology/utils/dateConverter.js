// @flow

/**
 * Helper function to convert dates to a more readable format.
 */

const dateConverter = (date: string) => {
  // dates arrive from API in YYYYMMDD format
  const year = date.substring(0, 4)
  const month = date.substring(4, 6)
  const day = date.substring(6, 8)

  return `${year}-${month}-${day}`
}

export default dateConverter
