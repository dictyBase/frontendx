import { Chip, ChipProps } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { capitalizeFirst } from "./utils"

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: "5px",
    backgroundColor: theme.palette.primary.main,
  },
}))

const SearchTerm = ({ label, ...rest }: ChipProps) => {
  const classes = useStyles()
  return (
    <Chip
      {...rest}
      label={capitalizeFirst(label as string)}
      size="medium"
      color="primary"
      className={classes.root}
    />
  )
}

export { SearchTerm }
