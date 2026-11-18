import { Chip, ChipProps } from "@mui/material"
import { makeStyles } from "tss-react/mui"
import { capitalizeFirst } from "./utils"

const useStyles = makeStyles()((theme) => ({
  root: {
    marginRight: "5px",
    backgroundColor: theme.palette.primary.main,
  },
}))

const SearchTerm = ({ label, ...rest }: ChipProps) => {
  const { classes } = useStyles()
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
