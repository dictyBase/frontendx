import { Chip } from "@material-ui/core"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { cyan } from "@material-ui/core/colors"

const fieldOptionColor = cyan["800"]

const useFieldOptionStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: "4px",
      color: theme.palette.getContrastText(fieldOptionColor),
      backgroundColor: fieldOptionColor,
    },
  }),
)

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
  const { root } = useFieldOptionStyles()
  return <Chip className={root} size="small" color="primary" label={label} />
}

export { FieldOption }
