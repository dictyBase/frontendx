import { Link } from "react-router-dom"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import ListItem from "@mui/material/ListItem"
import type { Phenotype } from "dicty-graphql-schema"
import { PublicationDisplay } from "./PublicationDisplay"
import { encodePhenotypeParameter } from "../utils/encodePhenotypeParameter"

const itemStyle = {
  paddingRight: "4px",
}

type Properties = {
  /** Phenotype data object */
  data: Phenotype
}

/**
 * PhenotypeListItem handles the display of an individual
 * row of phenotype data.
 */

const StrainPhenotypeListItem = ({ data }: Properties) => (
  <ListItem
    sx={{
      borderBottom: "1px solid rgba(224, 224, 224, 1)",
      paddingLeft: "8px",
      paddingRight: "8px",
      "&:nth-of-type(odd)": {
        backgroundColor: "#F4F6F8",
      },
    }}>
    <Grid container spacing={0} alignItems="center">
      <Grid item xs={3} sx={itemStyle}>
        <Typography variant="body2">
          <Link
            to={`/catalog?entity=strain&q=${encodePhenotypeParameter(
              data.phenotype,
            )}`}>
            {data.phenotype}
          </Link>
        </Typography>
      </Grid>
      <Grid item xs={3} sx={itemStyle}>
        <Typography variant="body2">{data.note}</Typography>
      </Grid>
      <Grid item xs={3} sx={itemStyle}>
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
      <Grid item xs={3} sx={itemStyle}>
        <Typography component="span" variant="body2">
          {data.publication && (
            <PublicationDisplay publication={data.publication} />
          )}
        </Typography>
      </Grid>
    </Grid>
  </ListItem>
)

export { StrainPhenotypeListItem }
