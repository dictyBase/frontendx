import { GeneQuery } from "dicty-graphql-schema"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core"
import useStyles from "../../../../styles/dataTableStyles"
import OtherError from "components/errors/OtherError"
import { commaSeparateWithAnd } from "common/utils/strings"
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ArticleIcon from '@mui/icons-material/Article';
import NoteIcon from '@mui/icons-material/Note';


type Props = {
  /** Array of GO annotations for a particular gene */
  gene: GeneQuery
}

/**
 * Panel to display Gene Ontology Annotations on the Gene Summary page.
 */
const ReferencesPanel = ({ gene }: Props) => {
  const classes = useStyles()

  if (!gene.allPublications?.publications) return <OtherError />
  const publications = gene.allPublications.publications

  

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="summary-references-table">
        <TableBody>
          {publications.map((publication, i) => (
            <TableRow key={i}>
              <TableCell>
                <b>
                  {commaSeparateWithAnd(publication.authors.map((a) => a.last_name))}
                </b>
                &nbsp; &apos;{publication.title}&apos; &nbsp;
                <i>{publication.journal}</i>
                &nbsp;
                {publication.pages}
              </TableCell>

              <TableCell>
                <a href="https://www.google.com/?client=safari">
                  <NewspaperIcon style={{ margin: "0px 5px 5px 0px" }} />
                </a>
                <a href="">
                  <ArticleIcon style={{ margin: "0px 5px 5px 0px" }} />
                </a>
                <a href="">
                  <NoteIcon style={{ margin: "0px 5px 5px 0px" }} />
                </a>
              </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ReferencesPanel
