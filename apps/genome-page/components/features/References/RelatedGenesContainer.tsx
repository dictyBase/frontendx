import { useRouter } from "next/router"
import {
  Paper,
  Grid,
  IconButton,
  makeStyles,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core"
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace"
import { pipe } from "fp-ts/function"
import {
  map as Amap,
  mapWithIndex as AmapWithIndex,
  chunksOf as AchunksOf,
} from "fp-ts/Array"
import { SelectedPublication } from "common/@types"
import { PublicationInfo } from "./PublicationInfo"

type MentionedGenesProperties = {
  publication: SelectedPublication
}

const useStyles = makeStyles({
  withPadding: {
    padding: "1rem",
  },
  returnButton: {
    position: "absolute",
  },
})

const RelatedGenesContainer = ({ publication }: MentionedGenesProperties) => {
  const classes = useStyles()
  const router = useRouter()
  const handleReturn = () => {
    router.back()
  }
  /*
   * 1. Sort alphabetically
   * 2. Chunk into array of =< N sized arrays
   * 3. render each into a row of size =< N
   */
  return (
    <Paper>
      <Grid container direction="column">
        <Grid item className={classes.withPadding}>
          <IconButton className={classes.returnButton}>
            <KeyboardBackspaceIcon onClick={handleReturn} />
          </IconButton>
          <PublicationInfo publication={publication} />
        </Grid>
        <Grid item>
          <TableContainer>
            <TableBody>
              {pipe(
                publication.related_genes,
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
          </TableContainer>
          {/* publication.related_genes.map((gene) => (
            <Chip
              clickable
              onClick={() => router.push(`/${gene.name}`)}
              key={gene.id}
              label={gene.name}
              size="medium"
              style={{ margin: "0px 5px 5px 0px" }}
              variant="outlined"
            />
          )) */}
        </Grid>
      </Grid>
    </Paper>
  )
}

export { RelatedGenesContainer }
