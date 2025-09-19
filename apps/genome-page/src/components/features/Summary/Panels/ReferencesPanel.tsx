import { ListPublicationsWithGeneSummaryQuery } from "dicty-graphql-schema"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core"
import { commaSeparateWithAnd } from "common/utils/strings"
import { parseFormattedStringToDomElements } from "@dictybase/ui-common"
import { useStyles } from "../../../../styles/dataTableStyles"

type Properties = {
  /** Array of GO annotations for a particular gene */
  publications: ListPublicationsWithGeneSummaryQuery["listPublicationsWithGene"]
}

/**
 * Panel to display Gene Ontology Annotations on the Gene Summary page.
 */
const ReferencesPanel = ({ publications }: Properties) => {
  const classes = useStyles()
  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="summary-references-table">
        <TableBody>
          {publications.map((publication) => (
            <TableRow key={publication.id}>
              <TableCell className={classes.referenceCell}>
                <b>
                  {commaSeparateWithAnd(
                    publication.authors.map((a) => a.last_name),
                  )}
                  .
                </b>{" "}
                &apos;{parseFormattedStringToDomElements(publication.title)}
                &apos; <i>{publication.journal}</i>, {publication.pages}
              </TableCell>

              <TableCell className={classes.cellIcons}>
                <a
                  className={classes.icon}
                  href={`${import.meta.env.VITE_PUBLICATION_URL}/${
                    publication.id
                  }`}>
                  <img
                    src="https://storage.dictybase.dev/editor/assets/2025-06-03/db56069a-19fe-4386-863e-28e483512bd6"
                    alt="Ref Dicty"
                    width={35}
                    height={35}
                  />
                </a>
                <a
                  className={classes.icon}
                  href={`https://pubmed.ncbi.nlm.nih.gov/${publication.id}`}>
                  <img
                    src="https://storage.dictybase.dev/editor/assets/2025-06-03/01e764b4-b5fb-4d7a-8416-8843b880d2aa"
                    alt="Ref Dicty"
                    width={35}
                    height={35}
                  />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export { ReferencesPanel }
