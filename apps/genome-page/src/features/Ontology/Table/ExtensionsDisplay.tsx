import React from "react"
import withLinkGenerator from "../utils/withLinkGenerator"
import useStyles from "./displayTableStyles"

/**
 * This handles the display for the extensions GO data.
 */

const ExtensionsDisplay = ({ extensions }: any) => {
  const classes = useStyles()

  if (extensions === null) {
    return <React.Fragment />
  }

  return (
    <React.Fragment>
      {extensions.map((item: any, index: number) => (
        <React.Fragment key={index}>
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
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}

export default ExtensionsDisplay
