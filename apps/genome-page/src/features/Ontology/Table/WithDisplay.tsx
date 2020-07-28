import React, { Fragment } from "react"
import withLinkGenerator from "../utils/withLinkGenerator"
import useStyles from "./displayTableStyles"

/**
 * This handles the display for the "With" GO data.
 */

const WithDisplay = ({ withData }: any) => {
  const classes = useStyles()

  if (withData === null) {
    return <Fragment />
  }

  return (
    <Fragment>
      {withData.map((item: any, index: number) => (
        <Fragment key={index}>
          <span>
            {item.name ? (
              <a
                className={classes.link}
                href={withLinkGenerator(item.id, item.db, item.name)}
                target="_blank"
                rel="noopener noreferrer">
                {item.name}
              </a>
            ) : (
              <a
                className={classes.link}
                href={withLinkGenerator(item.id, item.db)}
                target="_blank"
                rel="noopener noreferrer">
                {item.db}:{item.id}
              </a>
            )}
          </span>
          <br />
        </Fragment>
      ))}
    </Fragment>
  )
}

export default WithDisplay
