// @flow
import React from "react"
import { connect } from "react-redux"
import DisplayTable from "./DisplayTable"
import WithGoDataRendering from "./WithGoDataRendering"
import { Wrapper, GoHeaderStyle } from "styles/style"

type Props = {
  /** The data fetched from the API */
  data: Object,
}

/**
 * Filters and shares only the Electronic GO data (IEA)
 */

const ElectronicGO = (props: Props) => {
  const data = props.data.filter(code => code.evidence === "IEA")

  return (
    <Wrapper>
      <GoHeaderStyle>
        <h3>Molecular Function</h3>
      </GoHeaderStyle>
      <DisplayTable data={data} />
      <br />
      <GoHeaderStyle>
        <h3>Biological Process</h3>
      </GoHeaderStyle>
      <DisplayTable data={data} />
      <br />
      <GoHeaderStyle>
        <h3>Cellular Composition</h3>
      </GoHeaderStyle>
      <DisplayTable data={data} />
    </Wrapper>
  )
}

const mapStateToProps = ({ data }) => ({ data })

export default connect(mapStateToProps, null)(WithGoDataRendering(ElectronicGO))
