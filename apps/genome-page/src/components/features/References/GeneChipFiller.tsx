import { makeStyles } from "@material-ui/core"
import { Chip } from "@mui/material"
import { blueGrey } from "@mui/material/colors"

const useStyles = makeStyles({
  chip: {
    minWidth: "100%",
    minHeight: "5rem",
    justifyContent: "start",
    fontSize: "24px",
    paddingLeft: "0rem",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    backgroundColor: blueGrey[50],
  },
})

const GeneChipFiller = () => {
  const classes = useStyles()
  return (
    <Chip
      data-testid="gene-chip-filler"
      size="medium"
      className={classes.chip}
    />
  )
}

export { GeneChipFiller }
