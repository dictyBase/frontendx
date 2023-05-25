export const formatDateISOString = (dateString: string) => {
  const inMilliseconds = Date.parse(dateString)
  return new Date(inMilliseconds).toDateString()
}

export const getURLPathSegments = (path: string) => path.split("/").slice(1)

export const capitalizeFirstLetter = (string: string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`
