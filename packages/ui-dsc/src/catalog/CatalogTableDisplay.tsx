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
import { AddToCartButtonHandler } from "stock-center/src/components/AddToCartButtonHandler"
import { Link } from "react-router-dom"
import { RefObject } from "react"
import { v4 as uuid4 } from "uuid"
import { pipe } from "fp-ts/function"
import { slice, trimRight } from "fp-ts/string"
import { fromNullable, getOrElse } from "fp-ts/Option"
import type { CatalogItem, StrainItem, PlasmidItem } from "../types"
import { getCatalogItemPathAndDescriptor } from "../utils/getCatalogItemPathAndDescriptor"

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
  items: Array<CatalogItem>
  nextCursor: number
  targetReference: RefObject<HTMLType>
}

type cellFunctionItem = StrainItem | PlasmidItem

/**
 * The prop for {@link StrainCatalogTableDisplay}
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

const appendEllipses = (input: string) => `${input}...`

const abbreviateStringToLength = (length: number) => (input: string) => {
  if (input.length <= length) return input

  return pipe(input, slice(0, length), trimRight, appendEllipses)
}

const cellFunction = (item: cellFunctionItem) => {
  const { itemPath, itemDescriptor } = getCatalogItemPathAndDescriptor(item)
  return (
    <>
      <StyledTableCell fontSize="18" fontWeight="fontWeightMedium">
        <Link to={`/${itemPath}/${item.id}`}>{itemDescriptor}</Link>
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
}

const CatalogRows = ({
  items,
  nextCursor,
  targetReference,
}: CatalogRowFunctionProperties<HTMLTableRowElement>) => {
  const { row } = useStyles()
  return (
    <>
      {items.map((item, index: number) => {
        const key = `${item.id}`
        if (index === items.length - 1 && nextCursor !== 0) {
          // last item and expected to have more data
          return (
            <>
              <TableRow hover className={row} key={key}>
                {cellFunction(item)}
              </TableRow>
              <TableRow
                className={row}
                key="linear-progess"
                ref={targetReference}>
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
      })}
    </>
  )
}

/**
 * Displays data in tablular format in which the target DOM element is attached
 * to the penultimate table row to work in tandem with intersection observer.
 */
const StrainCatalogTableDisplay = ({
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
          <CatalogRows
            items={strains}
            nextCursor={nextCursor}
            targetReference={targetReference}
          />
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const PlasmidCatalogTableDisplay = ({
  data,
  dataField,
  target: targetReference,
}: CatalogListProperties<HTMLTableRowElement>): JSX.Element => {
  const classes = useStyles()
  const { plasmids, nextCursor } = data[dataField]
  return (
    <TableContainer className={classes.root}>
      <Table stickyHeader>
        <TableHead>
          <CatalogTableHeader
            headers={[
              "Plasmid Descriptor",
              "Plasmid Summary",
              "Plasmid ID",
              "",
            ]}
          />
        </TableHead>
        <TableBody>
          <CatalogRows
            items={plasmids}
            nextCursor={nextCursor}
            targetReference={targetReference}
          />
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export {
  abbreviateStringToLength,
  cellFunction,
  CatalogRows,
  StrainCatalogTableDisplay,
  PlasmidCatalogTableDisplay,
  CatalogTableHeader,
}
