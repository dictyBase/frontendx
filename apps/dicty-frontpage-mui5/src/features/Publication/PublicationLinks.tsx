import { Link } from "react-router-dom"
import { Typography, Grid } from "@material-ui/core"
import { match } from "ts-pattern"
import { pipe } from "fp-ts/function"
import { split as Ssplit } from "fp-ts/string"

/**
 * @param identifier the digital identifier of a publication
 * @returns a url for the publication on the archive corresponding to the identifier
 */
const getIdentifierUrl = (identifier: string) =>
  pipe(identifier, Ssplit(":"), (a) =>
    match(a[0])
      .with("pmid", () => `https://pubmed.ncbi.nlm.nih.gov/${a[1]}/`)
      .with("pmc", () => `https://www.ncbi.nlm.nih.gov/pmc/articles/${a[1]}/`)
      .with("doi", () => `https://doi.org/${a[1]}`)
      .otherwise(() => ""),
  )

type PublicationLinksProperties = {
  /* represents a list of digital identifiers associated with a publication */
  identifiers: Array<string>
}

/**
 * Displays Links to the publication on the archive websites where it is available.
 */
const PublicationLinks = ({ identifiers }: PublicationLinksProperties) => (
  <Grid container spacing={2}>
    {identifiers.map((id) => (
      <Grid item>
        <Typography display="inline">
          <Link to={getIdentifierUrl(id)}>{id}</Link>
        </Typography>
      </Grid>
    ))}
  </Grid>
)

export { PublicationLinks }
