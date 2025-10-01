import { Fragment, RefObject } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import LinearProgress from "@mui/material/LinearProgress"
import { styled } from "@mui/material/styles"
import { compose, borders, typography } from "@mui/system"
import { indigo } from "@mui/material/colors"
import { AddToCartButtonHandler } from "stock-center/src/components/AddToCartButtonHandler"
import { Link } from "react-router-dom"
import { v4 as uuid4 } from "uuid"
import { pipe } from "fp-ts/function"
import { slice, trimRight } from "fp-ts/string"
import { fromNullable, getOrElse } from "fp-ts/Option"
import type { CatalogItem, StrainItem, PlasmidItem } from "../types"
import { getCatalogItemPathAndDescriptor } from "../utils/getCatalogItemPathAndDescriptor"

const StyledTableCell = styled(TableCell)(compose(borders, typography))
const StyledTableContainer = styled(TableContainer)({ overflowX: "initial" })
const StyledCatalogRow = styled(TableRow)({
  borderBottom: "1px solid rgba(224, 224, 224, 1)",
  "@media (max-width: 1024px)": {
    "& p": {
      fontSize: "0.75rem !important",
    },
  },
})

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
}: CatalogTableHeaderProperties) => (
  <TableRow>
    {headers.map((h: string) => (
      <StyledTableCell
        sx={{
          backgroundColor: "#f6f9fc",
          color: "#525f7f",
          "@media (max-width: 1024px)": {
            fontSize: "0.85rem",
          },
        }}
        borderBottom={borderBottom}
        fontSize="subtitle1.fontSize"
        fontWeight="fontWeightBold"
        key={uuid4()}>
        {h}
      </StyledTableCell>
    ))}
  </TableRow>
)

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
}: CatalogRowFunctionProperties<HTMLTableRowElement>) => (
  <>
    {items.map((item, index: number) => {
      const key = `${item.id}`
      if (index === items.length - 1 && nextCursor !== 0) {
        // last item and expected to have more data
        return (
          <Fragment key={item.id}>
            <StyledCatalogRow hover key={key}>
              {cellFunction(item)}
            </StyledCatalogRow>
            <StyledCatalogRow key="linear-progess" ref={targetReference}>
              <TableCell colSpan={4}>
                <LinearProgress />
              </TableCell>
            </StyledCatalogRow>
          </Fragment>
        )
      }
      return (
        <StyledCatalogRow hover key={key}>
          {cellFunction(item)}
        </StyledCatalogRow>
      )
    })}
  </>
)

/**
 * Displays data in tablular format in which the target DOM element is attached
 * to the penultimate table row to work in tandem with intersection observer.
 */
const StrainCatalogTableDisplay = ({
  data,
  dataField,
  target: targetReference,
}: CatalogListProperties<HTMLTableRowElement>): JSX.Element => {
  const { strains, nextCursor } = data[dataField]
  return (
    <StyledTableContainer>
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
    </StyledTableContainer>
  )
}

const PlasmidCatalogTableDisplay = ({
  data,
  dataField,
  target: targetReference,
}: CatalogListProperties<HTMLTableRowElement>): JSX.Element => {
  const { plasmids, nextCursor } = data[dataField]
  return (
    <StyledTableContainer>
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
    </StyledTableContainer>
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
