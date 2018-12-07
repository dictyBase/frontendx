// @flow
import React, { Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"

import withLinkGenerator from "../utils/withLinkGenerator"
import styles from "./DisplayTableStyles"

type Props = {
  /** The extensions data from GO annotations */
  extensions: Array<Object>,
  /** Material-UI styling */
  classes: Object,
}

/**
 * This handles the display for the extensions GO data.
 */

const ExtensionsDisplay = (props: Props) => {
  const { extensions, classes } = props

  if (extensions === null) {
    return <Fragment />
  }

  return (
    <Fragment>
      {extensions.map((item, i) => (
        <Fragment key={i}>
          <span>
            {" "}
            <em>{item.relation}</em>{" "}
            {!item.name && (
              <a
                className={classes.link}
                href={withLinkGenerator(item.id, item.db)}
                target="_blank">
                ({item.db}:{item.id})
              </a>
            )}
            {item.name && (
              <a
                className={classes.link}
                href={withLinkGenerator(item.id, item.db, item.name)}
                target="_blank">
                ({item.name})
              </a>
            )}
          </span>
          <br />
        </Fragment>
      ))}
    </Fragment>
  )
}

export default withStyles(styles)(ExtensionsDisplay)
