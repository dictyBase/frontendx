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

const FieldOption = ({ label }: { label: string }) => {
  const { root } = useFieldOptionStyles()
  return <Chip className={root} size="small" color="primary" label={label} />
}

export { FieldOption }
