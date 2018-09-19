// @flow
import React from "react"
import { withRouter } from "react-router-dom"

type Props = {
  /** React Router's match object */
  match: Object,
}

const PageHeader = (props: Props) => {
  const { match } = props

  return (
    <h2>
      <center>Gene Information for {match.params.id}</center>
    </h2>
  )
}

export default withRouter(PageHeader)
