/* eslint-disable jsx-a11y/anchor-is-valid */
import { GeneQuery } from "dicty-graphql-schema"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core"
import { OtherError } from "components/errors/OtherError"
import { commaSeparateWithAnd } from "common/utils/strings"
import Image from "next/image"
import { useStyles } from "../../../../styles/dataTableStyles"

type Properties = {
  /** Array of GO annotations for a particular gene */
  gene: GeneQuery
}

/**
 * Panel to display Gene Ontology Annotations on the Gene Summary page.
 */
const ReferencesPanel = ({ gene }: Properties) => {
  const classes = useStyles()

  if (!gene.allPublications?.publications) return <OtherError />
  const { publications } = gene.allPublications

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="summary-references-table">
        <TableBody>
          {publications.map((publication) => (
            <TableRow key={publication.id}>
              <TableCell className={classes.cell}>
                <b>
                  {commaSeparateWithAnd(
                    publication.authors.map((a) => a.last_name),
                  )}
                </b>
                &nbsp; &apos;{publication.title}&apos; &nbsp;
                <i>{publication.journal}</i>
                &nbsp;
                {publication.pages}
              </TableCell>

              <TableCell className={classes.cellIcons}>
                <a
                  className={classes.icon}
                  href={`http://dictybase.org/publication/${publication.id}`}>
                  <Image
                    src="/refDicty.gif"
                    alt="Ref Dicty"
                    width={25}
                    height={25}
                  />
                </a>
                <a
                  className={classes.icon}
                  href={`https://pubmed.ncbi.nlm.nih.gov/${publication.issue}/`}>
                  <Image
                    src="/refPubmed.gif"
                    alt="Ref Dicty"
                    width={25}
                    height={25}
                  />
                </a>
                <a className={classes.icon} href="">
                  <Image
                    src="/refFull.gif"
                    alt="Ref Dicty"
                    width={25}
                    height={25}
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
