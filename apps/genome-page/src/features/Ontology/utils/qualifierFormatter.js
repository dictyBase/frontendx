import React, { Fragment } from "react"

/**
 * Helper function to handle GO qualifiers formatting
 */

const qualifierFormatter = (str) => {
  // remove pipe after NOT
  let converted = str.replace("NOT|", "NOT ")

  if (converted.substring(0, 3) === "NOT") {
    return (
      <Fragment>
        <strong>NOT </strong> <em>{converted.substring(4)}</em>
      </Fragment>
    )
  }

  return <em>{converted}</em>
}

export default qualifierFormatter
