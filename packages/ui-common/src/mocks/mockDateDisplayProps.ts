type DateDisplayProperties = {
  dateString: string
}

const mockDateDisplayProps: DateDisplayProperties = {
  dateString: "Fri, 23 Feb 2024 06:00:00 -0500",
}

const mockDateDisplayPropsISOFormat: DateDisplayProperties = {
  dateString: "2024-02-23T11:00:00.000Z",
}

const mockDateDisplayPropsRecentDate: DateDisplayProperties = {
  dateString: "Mon, 01 Jan 2024 12:00:00 -0500",
}

export {
  mockDateDisplayProps,
  mockDateDisplayPropsISOFormat,
  mockDateDisplayPropsRecentDate,
}
