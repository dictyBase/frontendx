// @flow
import React, { Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"

import withLinkGenerator from "../utils/withLinkGenerator"
import styles from "./DisplayTableStyles"

type Props = {
  /** The With data from GO annotations */
  withData: Array<Object>,
  /** Material-UI styling */
  classes: Object,
}

/**
 * This handles the display for the "With" GO data.
 */

const WithDisplay = (props: Props) => {
  const { withData, classes } = props

  if (withData === null) {
    return <Fragment />
  }

  return (
    <Fragment>
      {withData.map((item, i) => (
        <Fragment key={i}>
          <span>
            {!item.name && (
              <a
                className={classes.link}
                href={withLinkGenerator(item.id, item.db)}
                target="_blank">
                {item.db}:{item.id}
              </a>
            )}
            {item.name && (
              <a
                className={classes.link}
                href={withLinkGenerator(item.id, item.db, item.name)}
                target="_blank">
                {item.name}
              </a>
            )}
          </span>
          <br />
        </Fragment>
      ))}
    </Fragment>
  )
}

export default withStyles(styles)(WithDisplay)
