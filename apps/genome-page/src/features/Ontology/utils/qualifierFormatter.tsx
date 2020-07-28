import React from "react"

/**
 * Helper function to handle GO qualifiers formatting
 */

const qualifierFormatter = (str: string) => {
  // remove pipe after NOT
  let converted = str.replace("NOT|", "NOT ")

  if (converted.substring(0, 3) === "NOT") {
    return (
      <React.Fragment>
        <strong>NOT </strong> <em>{converted.substring(4)}</em>
      </React.Fragment>
    )
  }

  return <em>{converted}</em>
}

export default qualifierFormatter
