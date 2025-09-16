import { useRouter } from "next/router"
import { makeStyles, Box, Grid, Chip, Typography } from "@material-ui/core"
import { grey, teal } from "@material-ui/core/colors"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { map as Amap, takeLeft as AtakeLeft } from "fp-ts/Array"
import { ListPublicationsWithGeneQuery } from "dicty-graphql-schema"
import { SeeAllGenesChip } from "./SeeAllGenesChip"

const useStyles = makeStyles({
  chip: {
    backgroundColor: teal[50],
    "&:hover": {
      boxShadow: `1px 1px 2px ${grey[500]}`,
      backgroundColor: `${teal[100]} !important`,
    },
  },
  subheading: {
    fontWeight: 600,
    fontSize: "20px",
  },
})

const RelatedGenesList = ({
  publicationId,
  limit,
  genes,
}: {
  publicationId: string
  limit: number
  genes: ListPublicationsWithGeneQuery["listPublicationsWithGene"][0]["related_genes"]
}) => {
  const classes = useStyles()
  const router = useRouter()
  return (
    <Box>
      <Typography variant="h3" gutterBottom className={classes.subheading}>
        Other Genes Mentioned
      </Typography>
      <Grid container spacing={1}>
        {pipe(
          genes,
          AtakeLeft(limit),
          Amap((gene) => (
            <Grid item key={gene.id}>
              <Chip
                onClick={(event) => {
                  event.stopPropagation()
                  router.push(`/${gene.name}`)
                }}
                clickable
                size="medium"
                variant="outlined"
                label={gene.name}
                className={classes.chip}
              />
            </Grid>
          )),
        )}
        {pipe(
          genes.length > limit,
          Bmatch(
            () => <></>,
            () => (
              <Grid item>
                <SeeAllGenesChip
                  publicationId={publicationId}
                  geneCount={genes.length}
                />
              </Grid>
            ),
          ),
        )}
      </Grid>
    </Box>
  )
}

export { RelatedGenesList }
