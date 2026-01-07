import { Grid, GridSize } from "@mui/material"
import { makeStyles } from "tss-react/mui"
import { PhenotypeLeftPanel } from "./PhenotypeLeftPanel"
import { PhenotypeReferencePanel } from "./PhenotypeReferencePanel"

const gridItemSizingLeft: { [key: string]: GridSize } = {
  xs: 5,
  sm: 5,
  md: 5,
  lg: 5,
  xl: 5,
}

const gridItemSizingRight: { [key: string]: GridSize } = {
  xs: 7,
  sm: 7,
  md: 7,
  lg: 7,
  xl: 7,
}

const useAddPhenotypeFormContentProperties = makeStyles()({
  right: {
    width: "20rem",
  },
})

const AddPhenotypeFormContent = () => {
  const { classes } = useAddPhenotypeFormContentProperties()
  return (
    <Grid container direction="row" spacing={2} wrap="nowrap">
      <Grid {...gridItemSizingLeft} item>
        <PhenotypeLeftPanel />
      </Grid>
      <Grid className={classes.right} {...gridItemSizingRight} item>
        <PhenotypeReferencePanel />
      </Grid>
    </Grid>
  )
}

export { AddPhenotypeFormContent }
