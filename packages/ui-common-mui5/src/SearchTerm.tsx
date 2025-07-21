import { Chip, ChipProps } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: "5px",
    backgroundColor: theme.palette.primary.main,
  },
}))

const SearchTerm = ({ ...rest }: ChipProps) => {
  const classes = useStyles()
  return (
    <Chip {...rest} size="medium" color="primary" className={classes.root} />
  )
}

export { SearchTerm }
