import { Link } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import ListItem from "@material-ui/core/ListItem"
import { Phenotype } from "dicty-graphql-schema"
import { PublicationDisplay } from "./PublicationDisplay"
import { useStyles } from "./phenotypeStyles"

type Properties = {
  /** Phenotype data object */
  data: Phenotype
}

const replaceSpaces = (phenotype: string) => phenotype.split(" ").join("+")

/**
 * PhenotypeListItem handles the display of an individual
 * row of phenotype data.
 */

const StrainPhenotypeListItem = ({ data }: Properties) => {
  const classes = useStyles()

  return (
    <ListItem className={classes.row}>
      <Grid container spacing={0} alignItems="center">
        <Grid item xs={3} className={classes.item}>
          <Typography variant="body2">
            <Link to={`/phenotypes/${replaceSpaces(data.phenotype)}`}>
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
