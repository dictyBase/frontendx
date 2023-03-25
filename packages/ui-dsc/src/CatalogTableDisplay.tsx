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

const useStyles = makeStyles({
  root: { overflowX: "initial" },
})
const StyledTableCell = styled(TableCell)(compose(borders, typography))
const borderBottom = `2px solid ${indigo[700]}`
const tblHeaders = ["Strain Descriptor", "Strain Summary", "Strain ID"]

interface CatalogRowFnProps<Type> {
  strains: any
  nextCursor: number
  lastIndex: number
  targetRef: RefObject<Type>
}

/**
 * The prop for {@link CatalogTableDisplay}
 */
export interface CatalogListProps<T> {
  /** data for display*/
  data: any
  /** field for accessing the data*/
  dataField: string
  /** a DOM element
   * @typeparam T could be any HTML element
   */
  target: RefObject<T>
}

interface CatalogTableHeaderProps {
  headers?: Array<string>
}

function CatalogTableHeader({ headers = tblHeaders }: CatalogTableHeaderProps) {
  return (
    <TableRow>
      {headers.map((h: string, i: number) => {
        return (
          <StyledTableCell
            borderBottom={borderBottom}
            fontSize="subtitle1.fontSize"
            fontWeight="fontWeightBold"
            key={i}>
            {h}
          </StyledTableCell>
        )
      })}
    </TableRow>
  )
}

const truncate = (input: string, length: number): string => {
  if (input.length <= length) return input
  return input.slice(0, length)
}

const cellFn = (item: any) => {
  return (
    <>
      <StyledTableCell fontSize="18" fontWeight="fontWeightMedium">
        {item.label}
      </StyledTableCell>
      <StyledTableCell fontSize="18" fontWeight="fontWeightMedium">
        {truncate(item.summary, 84).concat("...")}
      </StyledTableCell>
      <StyledTableCell fontSize="18" fontWeight="fontWeightMedium">
        {item.id}
      </StyledTableCell>
    </>
  )
}

const rowFn = ({
  strains,
  nextCursor,
  targetRef,
  lastIndex,
}: CatalogRowFnProps<HTMLTableRowElement>) => {
  const rows = strains.map((item: any, idx: number) => {
    const key = `${item.id}${idx}`
    if (idx === lastIndex && nextCursor !== 0) {
      // last item and expected to have more data
      return (
        <>
          <TableRow key={key}>{cellFn(item)}</TableRow>
          <TableRow key={idx} ref={targetRef}>
            <TableCell colSpan={3}>
              <LinearProgress />
            </TableCell>
          </TableRow>
        </>
      )
    }
    return <TableRow key={key}>{cellFn(item)}</TableRow>
  })
  return rows
}

/**
 * Displays data in tablular format in which the target DOM element is attached
 * to the penultimate table row to work in tandem with intersection observer.
 */
export function CatalogTableDisplay({
  data,
  dataField,
  target: targetRef,
}: CatalogListProps<HTMLTableRowElement>): JSX.Element {
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
          {rowFn({ strains, nextCursor, targetRef, lastIndex })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
