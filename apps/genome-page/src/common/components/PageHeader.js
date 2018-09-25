// @flow
import React from "react"

type Props = {
  /** The gene name */
  name: string,
}

const PageHeader = (props: Props) => {
  const { name } = props

  return (
    <h2>
      <center>Gene Information for {name}</center>
    </h2>
  )
}

export default PageHeader
