/**
 * Helper function to convert dates to a more readable format.
 */

const dateConverter = (date: string) => {
  // dates arrive from API in YYYYMMDD format
  const year = date.slice(0, 4)
  const month = date.slice(4, 6)
  const day = date.slice(6, 8)

  return `${year}-${month}-${day}`
}

export { dateConverter }
