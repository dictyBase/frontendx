import { Link } from "react-router-dom"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import ListItem from "@mui/material/ListItem"
import type { Phenotype } from "dicty-graphql-schema"
import { flow } from "fp-ts/function"
import { split as Ssplit, Monoid as SMonoid } from "fp-ts/string"
import { intercalate as RNEAintercalate } from "fp-ts/ReadonlyNonEmptyArray"
import { PublicationDisplay } from "./PublicationDisplay"
import { useStyles } from "./phenotypeStyles"

type Properties = {
  /** Phenotype data object */
  data: Phenotype
}

/**
 * Encode a phenotype annotation string for use as a URL path segment.
 * Replaces spaces with "+" so the resulting URL parameter can be
 * decoded back to the original annotation.
 *
 * e.g. "abolished protein phosphorylation" → "abolished+protein+phosphorylation"
 * e.g. "wild type" → "wild+type"
 */
const encodePhenotypeParameter = flow(
  Ssplit("+"),
  RNEAintercalate(SMonoid)(" "),
)
/**
 * PhenotypeListItem handles the display of an individual
 * row of phenotype data.
 */

const StrainPhenotypeListItem = ({ data }: Properties) => {
  const { classes } = useStyles()

  return (
    <ListItem className={classes.row}>
      <Grid container spacing={0} alignItems="center">
        <Grid item xs={3} className={classes.item}>
          <Typography variant="body2">
            <Link
              to={`/phenotypes/${encodePhenotypeParameter(data.phenotype)}`}>
              {data.phenotype}
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={3} className={classes.item}>
          <Typography variant="body2">{data.note}</Typography>
        </Grid>
        <Grid item xs={3} className={classes.item}>
          <Typography variant="body2">
            {data.assay && (
              <span>
                <strong>Assay: </strong>
                {data.assay}
                <br />
              </span>
            )}
            {data.environment && (
              <span>
                <strong>Environment: </strong>
                {data.environment}
              </span>
            )}
          </Typography>
        </Grid>
        <Grid item xs={3} className={classes.item}>
          <Typography component="span" variant="body2">
            {data.publication && (
              <PublicationDisplay publication={data.publication} />
            )}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  )
}

export { StrainPhenotypeListItem }
