import { Box } from "@mui/material"
import { Citation } from "dicty-graphql-schema"

type Properties = {
  citations: Array<Citation>
}

/**
 * Displays the citation above the downloads table.
 */

const Citations = ({ citations }: Properties) => (
  <Box sx={{ fontSize: "0.9em" }}>
    <Box component="h3" sx={{ color: "#a7221e" }}>
      Please cite:
    </Box>
    {citations.map((citation: any) => (
      <p key={citation.title}>
        <strong>{citation.authors}</strong>
        {"  "}
        {citation.title}
        {"  "}
        <em>{citation.journal}</em>
        {"  "}
        <Box
          component="a"
          href={`/publication/${citation.pubmed_id}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ textDecoration: "none" }}>
          [Pubmed]
        </Box>
      </p>
    ))}
  </Box>
)

export { Citations }
