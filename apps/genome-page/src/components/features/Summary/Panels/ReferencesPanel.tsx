import { ListPublicationsWithGeneSummaryQuery } from "dicty-graphql-schema"
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material"
import { commaSeparateWithAnd } from "common/utils/strings"
import { parseFormattedStringToDomElements } from "@dictybase/ui-common"

const iconStyle = {
  margin: "0px 5px 5px 0px",
}

type Properties = {
  /** Array of GO annotations for a particular gene */
  publications: ListPublicationsWithGeneSummaryQuery["listPublicationsWithGene"]
}

/**
 * Panel to display Gene Ontology Annotations on the Gene Summary page.
 */
const ReferencesPanel = ({ publications }: Properties) => (
  <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
    <Table aria-label="summary-references-table">
      <TableBody>
        {publications.map((publication) => (
          <TableRow key={publication.id}>
            <TableCell sx={{ padding: "4px 56px 4px 24px" }}>
              <b>
                {commaSeparateWithAnd(
                  publication.authors.map((a) => a.last_name),
                )}
                .
              </b>{" "}
              &apos;{parseFormattedStringToDomElements(publication.title)}
              &apos; <i>{publication.journal}</i>, {publication.pages}
            </TableCell>

            <TableCell
              sx={{ padding: "4px", textAlign: "right", width: "100px" }}>
              <Box
                component="a"
                sx={iconStyle}
                href={`${import.meta.env.VITE_PUBLICATION_URL}/${
                  publication.id
                }`}>
                <img
                  src="https://storage.dictybase.dev/editor/assets/2025-06-03/db56069a-19fe-4386-863e-28e483512bd6"
                  alt="Ref Dicty"
                  width={35}
                  height={35}
                />
              </Box>
              <Box
                component="a"
                sx={iconStyle}
                href={`https://pubmed.ncbi.nlm.nih.gov/${publication.id}`}>
                <img
                  src="https://storage.dictybase.dev/editor/assets/2025-06-03/01e764b4-b5fb-4d7a-8416-8843b880d2aa"
                  alt="Ref Dicty"
                  width={35}
                  height={35}
                />
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)

export { ReferencesPanel }
