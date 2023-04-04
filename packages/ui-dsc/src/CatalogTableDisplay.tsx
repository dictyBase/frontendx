import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import LinearProgress from "@material-ui/core/LinearProgress"
import { makeStyles, styled } from "@material-ui/core/styles"
import { compose, borders, typography } from "@material-ui/system"
import { indigo } from "@material-ui/core/colors"
import { RefObject } from "react"
import { v4 as uuid4 } from "uuid"

const useStyles = makeStyles({
  root: { overflowX: "initial" },
})
const StyledTableCell = styled(TableCell)(compose(borders, typography))
const borderBottom = `2px solid ${indigo[700]}`
const tableHeaders = ["Strain Descriptor", "Strain Summary", "Strain ID"]

interface CatalogRowFunctionProperties<Type> {
  strains: any
  nextCursor: number
  lastIndex: number
  targetReference: RefObject<Type>
}

/**
 * The prop for {@link CatalogTableDisplay}
 */
export interface CatalogListProperties<T> {
  /** data for display */
  data: any
  /** field for accessing the data */
  dataField: string
  /** a DOM element
   * @typeparam T could be any HTML element
   */
  target: RefObject<T>
}

interface CatalogTableHeaderProperties {
  headers?: Array<string>
}

const CatalogTableHeader = ({
  headers = tableHeaders,
}: CatalogTableHeaderProperties) => (
  <TableRow>
    {headers.map((h: string) => (
      <StyledTableCell
        borderBottom={borderBottom}
        fontSize="subtitle1.fontSize"
        fontWeight="fontWeightBold"
        key={uuid4()}>
        {h}
      </StyledTableCell>
    ))}
  </TableRow>
)

const truncate = (input: string, length: number): string => {
  if (input.length <= length) return input
  return input.slice(0, length)
}

const cellFunction = (item: any) => (
  <>
    <StyledTableCell fontSize="18" fontWeight="fontWeightMedium">
      {item.label}
    </StyledTableCell>
    <StyledTableCell fontSize="18" fontWeight="fontWeightMedium">
      {`${truncate(item.summary, 84)}...}`}
    </StyledTableCell>
    <StyledTableCell fontSize="18" fontWeight="fontWeightMedium">
      {item.id}
    </StyledTableCell>
  </>
)

const rowFunction = ({
  strains,
  nextCursor,
  targetReference,
  lastIndex,
}: CatalogRowFunctionProperties<HTMLTableRowElement>) => {
  strains.map((item: any, index: number) => {
    const key = `${item.id}`
    if (index === lastIndex && nextCursor !== 0) {
      // last item and expected to have more data
      return (
        <>
          <TableRow key={key}>{cellFunction(item)}</TableRow>
          <TableRow key={key} ref={targetReference}>
            <TableCell colSpan={3}>
              <LinearProgress />
            </TableCell>
          </TableRow>
        </>
      )
    }
    return <TableRow key={key}>{cellFunction(item)}</TableRow>
  })
}

/**
 * Displays data in tablular format in which the target DOM element is attached
 * to the penultimate table row to work in tandem with intersection observer.
 */
export const CatalogTableDisplay = ({
  data,
  dataField,
  target: targetReference,
}: CatalogListProperties<HTMLTableRowElement>): JSX.Element => {
  const classes = useStyles()
  const { strains, nextCursor } = data[dataField]
  const lastIndex = strains.length - 1
  return (
    <TableContainer className={classes.root}>
      <Table stickyHeader>
        <TableHead>
          <CatalogTableHeader />
        </TableHead>
        <TableBody>
          {rowFunction({ strains, nextCursor, targetReference, lastIndex })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
