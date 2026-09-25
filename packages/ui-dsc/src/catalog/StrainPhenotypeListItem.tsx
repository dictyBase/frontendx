import { Link } from "react-router-dom"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import ListItem from "@mui/material/ListItem"
import { Phenotype } from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import { startsWith as SstartsWith, slice as Sslice } from "fp-ts/string"
import { findFirst as AfindFirst } from "fp-ts/Array"
import { map as Omap, getOrElse as OgetOrElse } from "fp-ts/Option"
import { QUALITY_OPTIONS } from "../const"
import { PublicationDisplay } from "./PublicationDisplay"
import { useStyles } from "./phenotypeStyles"

type Properties = {
  /** Phenotype data object */
  data: Phenotype
}

/**
 * Split a phenotype annotation string into quality and entity search params.
 * Uses known quality options as prefixes to determine the split point.
 *
 * @param phenotype - The full phenotype annotation string.
 * @returns A query string with quality and (optionally) entity params.
 *
 * e.g. "abolished protein phosphorylation" → "?quality=abolished&entity=protein+phosphorylation"
 * e.g. "wild type" → "?quality=wild+type"
 */
const phenotypeToSearchParameters = (phenotype: string) =>
  pipe(
    QUALITY_OPTIONS,
    AfindFirst((q) => pipe(phenotype, SstartsWith(`${q} `))),
    Omap(
      (quality) =>
        new URLSearchParams({
          quality,
          entity: pipe(phenotype, Sslice(quality.length + 1, phenotype.length)),
        }),
    ),
    OgetOrElse(() => new URLSearchParams({ quality: phenotype })),
    (parameters) => `?${parameters.toString()}`,
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
              to={`/phenotypes${phenotypeToSearchParameters(data.phenotype)}`}>
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
