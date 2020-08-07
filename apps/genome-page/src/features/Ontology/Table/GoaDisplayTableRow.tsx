import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import ExtensionsDisplay from "./ExtensionsDisplay"
import WithDisplay from "./WithDisplay"
import pubLinkGenerator from "../utils/pubLinkGenerator"
import dateConverter from "../utils/dateConverter"
import qualifierFormatter from "../utils/qualifierFormatter"
import sourceLinkGenerator from "../utils/sourceLinkGenerator"
import StyledExternalLink from "common/components/StyledExternalLink"
import { GeneGOA } from "common/@types/gene-data"

const useStyles = makeStyles({
  row: {
    "&:nth-of-type(even)": {
      // backgroundColor: theme.palette.background.default,
    },
  },
})

type Props = {
  /** Individual GO Annotation */
  item: GeneGOA
}

/**
 * The display table used inside each panel in the GO tabs.
 */

const GoaDisplayTableRow = ({ item }: Props) => {
  const classes = useStyles()

  return (
    <TableRow className={classes.row} data-testid="table-row">
      <TableCell component="th" scope="row">
        {qualifierFormatter(item.qualifier)} {item.go_term}
      </TableCell>
      <TableCell>
        <ExtensionsDisplay extensions={item.extensions} />
      </TableCell>
      <TableCell>{item.evidence_code}</TableCell>
      <TableCell>
        <WithDisplay withData={item.with} />
      </TableCell>
      <TableCell>
        <StyledExternalLink
          href={pubLinkGenerator(item.publication)}
          content={item.publication}
        />
      </TableCell>
      <TableCell>{dateConverter(item.date)}</TableCell>
      <TableCell>
        <StyledExternalLink
          href={sourceLinkGenerator(item.assigned_by)}
          content={item.assigned_by}
        />
      </TableCell>
    </TableRow>
  )
}

export default GoaDisplayTableRow
