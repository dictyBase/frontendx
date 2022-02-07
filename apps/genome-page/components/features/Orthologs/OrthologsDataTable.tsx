import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@material-ui/core"
  import { GeneQuery } from "dicty-graphql-schema"
  import OtherError from "components/errors/OtherError"
  import useStyles from "../../../styles/dataTableStyles"
  import RenderOrthologs from "./RenderOrthologs"
  
  interface OrthologsDataTableProps {
    data: GeneQuery
  }
  
  const OrthologsDataTable = ({ data }: OrthologsDataTableProps) => {
    const classes = useStyles()
  
    if (!data.allOrthologs) return <OtherError />
    const allOrthologs = data.allOrthologs
  
    return (
      <TableContainer component={Paper} className={classes.root}>
        <Table aria-label="orthologs-table">
          <TableHead className={classes.head}>
            <TableRow className={classes.headRow}>
              <TableCell>Species</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>UniProtKB</TableCell>
              <TableCell>Gene Product</TableCell>
              <TableCell>Source(s)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allOrthologs.orthologs?.map((ortholog, i) => (
              <RenderOrthologs ortholog={ortholog} key={`ortholog#${i}`} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
  
  export default OrthologsDataTable
  