export const formatDateISOString = (dateString: string) => {
  const inMilliseconds = Date.parse(dateString)
  return new Date(inMilliseconds).toDateString()
}
