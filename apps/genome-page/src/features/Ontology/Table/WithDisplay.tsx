import React from "react"
import withLinkGenerator from "../utils/withLinkGenerator"
import useStyles from "./displayTableStyles"
import { With } from "common/@types/gene-data"

type Props = {
  withData?: Array<With>
}

/**
 * This handles the display for the "With" GO data.
 */

const WithDisplay = ({ withData }: Props) => {
  const classes = useStyles()

  if (withData === null || withData === undefined) {
    return <React.Fragment />
  }

  return (
    <React.Fragment>
      {withData.map((item: With, index: number) => (
        <React.Fragment key={index}>
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
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}

export default WithDisplay
