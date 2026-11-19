import { Chip } from "@mui/material"
import { capitalizeFirst } from "./utils"

type FieldOptionProperties = {
  /**
   * The label text of the component
   */
  label: string
}

/**
 * This component is used in the Searchbox component. It is used for displaying the field options
 * in the Autocomplete component as well as the `active chip value` for the Autocomplete's tags.
 */
const FieldOption = ({ label }: FieldOptionProperties) => (
  <Chip
    sx={(theme) => ({
      borderRadius: "4px",
      color: theme.palette.getContrastText(theme.palette.primary.light),
      backgroundColor: theme.palette.primary.light,
    })}
    size="medium"
    label={capitalizeFirst(label)}
  />
)

export { FieldOption }
