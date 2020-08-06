import React from "react"
import withLinkGenerator from "../utils/withLinkGenerator"
import useStyles from "./displayTableStyles"
import { Extension } from "common/@types/gene-data"

type Props = {
  /** List of extensions for a given annotation */
  extensions?: Array<Extension>
}

/**
 * This handles the display for the extensions GO data.
 */

const ExtensionsDisplay = ({ extensions }: Props) => {
  const classes = useStyles()

  if (extensions === null || extensions === undefined) {
    return <React.Fragment />
  }

  return (
    <React.Fragment>
      {extensions.map((item: Extension, index: number) => (
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
