import React, { Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import withLinkGenerator from "../utils/withLinkGenerator"
import styles from "./DisplayTableStyles"

/**
 * This handles the display for the extensions GO data.
 */

const ExtensionsDisplay = ({ extensions, classes }) => {
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
            {item.name ? (
              <a
                className={classes.link}
                href={withLinkGenerator(item.id, item.db, item.name)}
                target="_blank"
                rel="noopener noreferrer">
                ({item.name})
              </a>
            ) : (
              <a
                className={classes.link}
                href={withLinkGenerator(item.id, item.db)}
                target="_blank"
                rel="noopener noreferrer">
                ({item.db}:{item.id})
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
