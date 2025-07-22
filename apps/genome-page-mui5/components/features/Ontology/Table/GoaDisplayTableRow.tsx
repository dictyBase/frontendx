import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import { pubLinkGenerator } from "common/utils/pubLinkGenerator"
import { dateConverter } from "common/utils/dateConverter"
import { qualifierFormatter } from "common/utils/qualifierFormatter"
import { sourceLinkGenerator } from "common/utils/sourceLinkGenerator"
import { StyledExternalLink } from "components/StyledExternalLink"
import { GoAnnotation, With, Extension } from "dicty-graphql-schema"
import { WithExtensionLink } from "./WithExtensionLink"

const useStyles = makeStyles({
  row: {
    "&:nth-of-type(even)": {
      // backgroundColor: theme.palette.background.default,
    },
  },
})

type Properties = {
  /** Individual GO Annotation */
  item: GoAnnotation
}

/**
 * The display table used inside each panel in the GO tabs.
 */

const GoaDisplayTableRow = ({ item: annotationItem }: Properties) => {
  const classes = useStyles()

  return (
    <TableRow className={classes.row} data-testid="table-row">
      <TableCell component="th" scope="row">
        {qualifierFormatter(annotationItem.qualifier)} {annotationItem.go_term}
      </TableCell>
      <TableCell>
        {annotationItem.extensions?.map((item: Extension) => (
          <React.Fragment key={item.id}>
            {" "}
            <em>{item.relation}</em> (<WithExtensionLink item={item} />)
            <br />
          </React.Fragment>
        ))}
      </TableCell>
      <TableCell>{annotationItem.evidence_code}</TableCell>
      <TableCell>
        {annotationItem.with?.map((item: With) => (
          <React.Fragment key={item.id}>
            <WithExtensionLink item={item} />
            <br />
          </React.Fragment>
        ))}
      </TableCell>
      <TableCell>
        <StyledExternalLink
          href={pubLinkGenerator(annotationItem.publication)}
          content={annotationItem.publication}
        />
      </TableCell>
      <TableCell>{dateConverter(annotationItem.date)}</TableCell>
      <TableCell>
        <StyledExternalLink
          href={sourceLinkGenerator(annotationItem.assigned_by)}
          content={annotationItem.assigned_by}
        />
      </TableCell>
    </TableRow>
  )
}

export { GoaDisplayTableRow }
