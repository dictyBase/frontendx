import { Grid } from "@mui/material"
import { pipe } from "fp-ts/function"
import {
  map as Amap,
  mapWithIndex as AmapWithIndex,
  makeBy as AmakeBy,
} from "fp-ts/Array"
import { Gene } from "dicty-graphql-schema"
import { GeneChip } from "./GeneChip"
import { GeneChipFiller } from "./GeneChipFiller"

type RelatedGenesProperties = {
  genes: Array<Gene>
  maxCount: number
}

const itemStyle = {
  flexBasis: "25%",
}

const filler = { _tag: "filler" }

const RelatedGenesDisplay = ({ genes, maxCount }: RelatedGenesProperties) => (
  <Grid
    component="ul"
    container
    spacing={2}
    sx={{
      width: "100%",
      margin: "0",
      padding: "0",
      listStyle: "none",
    }}
    data-testid="related-genes-list">
    {pipe(
      genes,
      Amap((gene) => (
        <Grid component="li" item sx={itemStyle} key={gene.id}>
          <GeneChip gene={gene} />
        </Grid>
      )),
    )}
    {pipe(
      AmakeBy(maxCount - genes.length, () => filler),
      AmapWithIndex((index) => (
        <Grid item sx={itemStyle} key={index}>
          <GeneChipFiller />
        </Grid>
      )),
    )}
  </Grid>
)

export { RelatedGenesDisplay }
