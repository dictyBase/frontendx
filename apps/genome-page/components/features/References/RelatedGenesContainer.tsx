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
import { RelatedGenesDisplay } from "./RelatedGenesDisplay"

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
          <RelatedGenesDisplay genes={publication.related_genes} />
        </Grid>
      </Grid>
    </Paper>
  )
}

export { RelatedGenesContainer }
