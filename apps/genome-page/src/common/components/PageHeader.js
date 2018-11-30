// @flow
import React from "react"
import { withRouter } from "react-router-dom"

type Props = {
  /** The gene name */
  name: string,
  /** React Router match object */
  match: Object,
}

const titleConverter = path => {
  if (path.includes("goannotations")) {
    return "Gene Ontology Annotations"
  }
  return "Gene Information"
}

/**
 * Basic page header for all gene pages.
 */

const PageHeader = (props: Props) => {
  const { name, match } = props

  if (!name) {
    return (
      <center>
        <br /> <br />
      </center>
    )
  }

  return (
    <h2>
      <center>
        {titleConverter(match.path)} for {name}
      </center>
    </h2>
  )
}

export default withRouter(PageHeader)
