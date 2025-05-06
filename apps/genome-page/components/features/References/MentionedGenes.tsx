import { useRouter } from "next/router"
import {
  Paper,
  Grid,
  Chip,
  IconButton,
  makeStyles,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core"
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace"
import { useSetAtom } from "jotai"
import { pipe } from "fp-ts/function"
import { none } from "fp-ts/Option"
import { map as Amap, chunksOf as AchunksOf } from "fp-ts/Array"
import { SelectedPublication, selectedPublication } from "./state"
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

const MentionedGenes = ({ publication }: MentionedGenesProperties) => {
  const setPublication = useSetAtom(selectedPublication)
  const classes = useStyles()
  const router = useRouter()
  const handleReturn = () => {
    setPublication(none)
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
                AchunksOf(7),
                // note: add key
                Amap((genesChunk) => (
                  <TableRow>
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

export { MentionedGenes }
