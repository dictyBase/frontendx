import {
  makeStyles,
  Grid,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core"
import { pipe } from "fp-ts/function"
import {
  map as Amap,
  mapWithIndex as AmapWithIndex,
  chunksOf as AchunksOf,
} from "fp-ts/Array"
import { Gene } from "dicty-graphql-schema"

type MentionedGenesProperties = { genes: Array<Gene> }

const useStyles = makeStyles({
  body: {
    boxShadow: "inset -5px -5px black",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "red",
    borderCollapse: "collapse",
  },
})

const RelatedGenesDisplay = ({ genes }: MentionedGenesProperties) => {
  const classes = useStyles()
  return (
    <TableContainer>
      <Grid container justifyContent="center">
        <Grid item>
          <TableBody className={classes.body}>
            {pipe(
              genes,
              AchunksOf(12),
              AmapWithIndex((index, genesChunk) => (
                <TableRow key={index}>
                  {pipe(
                    genesChunk,
                    Amap((gene) => (
                      <TableCell key={gene.id}>{gene.name}</TableCell>
                    )),
                  )}
                </TableRow>
              )),
            )}
          </TableBody>
        </Grid>
      </Grid>
    </TableContainer>
  )
}

export { RelatedGenesDisplay }
