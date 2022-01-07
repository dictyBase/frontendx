import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import WithExtensionLink from "features/Ontology/Table/WithExtensionLink"
import pubLinkGenerator from "common/utils/pubLinkGenerator"
import dateConverter from "common/utils/dateConverter"
import qualifierFormatter from "common/utils/qualifierFormatter"
import sourceLinkGenerator from "common/utils/sourceLinkGenerator"
import StyledExternalLink from "components/StyledExternalLink"
import { GoAnnotation, With, Extension } from "dicty-graphql-schema"

const useStyles = makeStyles({
  row: {
    "&:nth-of-type(even)": {
      // backgroundColor: theme.palette.background.default,
    },
  },
})

type Props = {
  /** Individual GO Annotation */
  item: GoAnnotation
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
        {item.extensions?.map((item: Extension, index: number) => (
          <React.Fragment key={index}>
            {" "}
            <em>{item.relation}</em> (<WithExtensionLink item={item} />)
            <br />
          </React.Fragment>
        ))}
      </TableCell>
      <TableCell>{item.evidence_code}</TableCell>
      <TableCell>
        {item.with?.map((item: With, index: number) => (
          <React.Fragment key={index}>
            <WithExtensionLink item={item} />
            <br />
          </React.Fragment>
        ))}
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
