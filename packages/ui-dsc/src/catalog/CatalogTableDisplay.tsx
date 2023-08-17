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
import { AddToCartButtonHandler } from "stock-catalog-list/src/components/AddToCartButtonHandler"
import { Link } from "react-router-dom"
import { RefObject } from "react"
import { v4 as uuid4 } from "uuid"
import { pipe } from "fp-ts/function"
import { fromNullable, getOrElse } from "fp-ts/Option"
import { type Strain } from "dicty-graphql-schema"

const useStyles = makeStyles({
  listHeaders: {
    borderBottom: "1px solid #888",
    backgroundColor: "#f6f9fc",
    color: "#525f7f",
    fontWeight: 600,
    "@media (max-width: 1024px)": {
      fontSize: "0.85rem",
    },
  },
  root: { overflowX: "initial" },
  row: {
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    "@media (max-width: 1024px)": {
      "& p": {
        fontSize: "0.75rem !important",
      },
    },
  },
})
const StyledTableCell = styled(TableCell)(compose(borders, typography))
const borderBottom = `2px solid ${indigo[700]}`
const tableHeaders = ["Strain Descriptor", "Strain Summary", "Strain ID", ""]

interface CatalogRowFunctionProperties<HTMLType> {
  strains: Array<Pick<Strain, "id" | "label" | "summary" | "inStock">>
  nextCursor: number
  targetReference: RefObject<HTMLType>
}

type cellFunctionItem = Pick<Strain, "id" | "label" | "summary" | "inStock">

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
}: CatalogTableHeaderProperties) => {
  const classes = useStyles()
  return (
    <TableRow>
      {headers.map((h: string) => (
        <StyledTableCell
          className={classes.listHeaders}
          borderBottom={borderBottom}
          fontSize="subtitle1.fontSize"
          fontWeight="fontWeightBold"
          key={uuid4()}>
          {h}
        </StyledTableCell>
      ))}
    </TableRow>
  )
}

const abbreviateStringToLength = (length: number) => (input: string) => {
  if (input.length <= length) return input
  return input.slice(0, length)
}

const cellFunction = (item: cellFunctionItem) => (
  <>
    <StyledTableCell fontSize="18" fontWeight="fontWeightMedium">
      <Link to={`/strains/${item.id}`}>{item.label}</Link>
    </StyledTableCell>
    <StyledTableCell fontSize="18" fontWeight="fontWeightMedium">
      {pipe(
        fromNullable(item.summary),
        getOrElse(() => ""),
        abbreviateStringToLength(84),
      )}
    </StyledTableCell>
    <StyledTableCell fontSize="18" fontWeight="fontWeightMedium">
      {item.id}
    </StyledTableCell>
    <StyledTableCell fontSize="18" fontWeight="fontWeightMedium">
      <AddToCartButtonHandler item={item} />
    </StyledTableCell>
  </>
)

const rowFunction = ({
  strains,
  nextCursor,
  targetReference,
}: CatalogRowFunctionProperties<HTMLTableRowElement>) => {
  const { row } = useStyles()
  return strains.map((item, index: number) => {
    const key = `${item.id}`
    if (index === strains.length - 1 && nextCursor !== 0) {
      // last item and expected to have more data
      return (
        <>
          <TableRow hover className={row} key={key}>
            {cellFunction(item)}
          </TableRow>
          <TableRow className={row} key={key} ref={targetReference}>
            <TableCell colSpan={4}>
              <LinearProgress />
            </TableCell>
          </TableRow>
        </>
      )
    }
    return (
      <TableRow hover className={row} key={key}>
        {cellFunction(item)}
      </TableRow>
    )
  })
}

/**
 * Displays data in tablular format in which the target DOM element is attached
 * to the penultimate table row to work in tandem with intersection observer.
 */
const CatalogTableDisplay = ({
  data,
  dataField,
  target: targetReference,
}: CatalogListProperties<HTMLTableRowElement>): JSX.Element => {
  const classes = useStyles()
  const { strains, nextCursor } = data[dataField]
  return (
    <TableContainer className={classes.root}>
      <Table stickyHeader>
        <TableHead>
          <CatalogTableHeader />
        </TableHead>
        <TableBody>
          {rowFunction({ strains, nextCursor, targetReference })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export {
  abbreviateStringToLength,
  cellFunction,
  rowFunction,
  CatalogTableDisplay,
  CatalogTableHeader,
}
