import { Typography } from "@material-ui/core"

type DateDisplayProperties = {
  /**
   * The date string to convert and display.
   */
  dateString: string
}

/**
 * Displays the date with the format [MONTH] [DD] [YYYY] converted from the given date string.
 *
 * ex: Fri, 23 Feb 2024 06:00:00 -0500 -> February 23, 2024
 */
const DateDisplay = ({ dateString }: DateDisplayProperties) => (
  <Typography>
    {new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}
  </Typography>
)

export { DateDisplay }
