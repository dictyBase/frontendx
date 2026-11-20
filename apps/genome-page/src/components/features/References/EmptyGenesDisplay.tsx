import { Grid } from "@mui/material"
import { pipe } from "fp-ts/function"
import { mapWithIndex as AmapWithIndex, makeBy as AmakeBy } from "fp-ts/Array"
import { GeneChipFiller } from "./GeneChipFiller"
import { EmptyGenesOverlay } from "./EmptyGenesOverlay"

type RelatedGenesProperties = {
  maxCount: number
}

const filler = { _tag: "filler" }

const EmptyGenesDisplay = ({ maxCount }: RelatedGenesProperties) => (
  <Grid
    container
    spacing={2}
    sx={{ position: "relative", width: "100%", margin: "auto" }}>
    <EmptyGenesOverlay />
    {pipe(
      AmakeBy(maxCount, () => filler),
      AmapWithIndex((index) => (
        <Grid item sx={{ flexBasis: "25%" }} key={index}>
          <GeneChipFiller />
        </Grid>
      )),
    )}
  </Grid>
)

export { EmptyGenesDisplay }
