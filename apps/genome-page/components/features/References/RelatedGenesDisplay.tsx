import { useRouter } from "next/router"
import {
  makeStyles,
  Chip,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core"
import { blueGrey, lightBlue } from "@material-ui/core/colors"
import { pipe } from "fp-ts/function"
import {
  map as Amap,
  mapWithIndex as AmapWithIndex,
  chunksOf as AchunksOf,
} from "fp-ts/Array"
import { Gene } from "dicty-graphql-schema"

type RelatedGenesProperties = { genes: Array<Gene> }

const useStyles = makeStyles((theme) => ({
  container: {
    width: "fit-content",
    maxHeight: "30rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(50, 50, 50, 0.5)",
    boxShadow: `inset 2px 2px 2px ${blueGrey[300]}`,
    borderRadius: "0.5rem",
    backgroundColor: lightBlue[50],
    overflowY: "scroll",
  },
  cell: {
    borderBottom: "unset",
    padding: "0.75rem",
  },
  chip: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `2px 2px ${blueGrey[300]}`,
    fontSize: "1rem",
    width: "100%",
  },
}))

const RelatedGenesDisplay = ({ genes }: RelatedGenesProperties) => {
  const router = useRouter()
  const classes = useStyles()
  return (
    <TableContainer className={classes.container}>
      <TableBody>
        {pipe(
          genes,
          AchunksOf(7),
          AmapWithIndex((index, genesChunk) => (
            <TableRow key={index}>
              {pipe(
                genesChunk,
                Amap((gene) => (
                  <TableCell key={gene.id} className={classes.cell}>
                    <Chip
                      clickable
                      onClick={() => router.push(`/${gene.name}`)}
                      key={gene.id}
                      label={gene.name}
                      size="medium"
                      variant="outlined"
                      className={classes.chip}
                    />
                  </TableCell>
                )),
              )}
            </TableRow>
          )),
        )}
      </TableBody>
    </TableContainer>
  )
}

export { RelatedGenesDisplay }
