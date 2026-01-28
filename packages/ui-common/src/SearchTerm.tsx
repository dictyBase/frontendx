import { Chip, ChipProps } from "@mui/material"
import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()((theme) => ({
  root: {
    marginRight: "5px",
    backgroundColor: theme.palette.primary.main,
  },
}))

const SearchTerm = ({ ...rest }: ChipProps) => {
  const { classes } = useStyles()
  return (
    <Chip {...rest} size="medium" color="primary" className={classes.root} />
  )
}

export { SearchTerm }
