import { Chip, Theme } from "@mui/material"
import { makeStyles } from "tss-react/mui"
import { capitalizeFirst } from "./utils"

const useFieldOptionStyles = makeStyles()((theme: Theme) => ({
  root: {
    borderRadius: "4px",
    color: theme.palette.getContrastText(theme.palette.primary.light),
    backgroundColor: theme.palette.primary.light,
  },
}))

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
const FieldOption = ({ label }: FieldOptionProperties) => {
  const {
    classes: { root },
  } = useFieldOptionStyles()
  return <Chip className={root} size="medium" label={capitalizeFirst(label)} />
}

export { FieldOption }
