// @flow
import React from "react"
import { connect } from "react-redux"
import DisplayTable from "./DisplayTable"
import WithGoDataRendering from "./WithGoDataRendering"
import { Wrapper, GoHeaderStyle } from "styles/style"

type Props = {
  /** The data fetched from the API */
  goData: Object,
}

/**
 * Filters and shares only the Manual GO data (IMP, IGI, IDA, IBA)
 */

export const ManualGO = (props: Props) => {
  const data = props.goData.data.filter(
    code =>
      code.evidence === "IMP" ||
      code.evidence === "IGI" ||
      code.evidence === "IDA" ||
      code.evidence === "IBA",
  )
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

const mapStateToProps = ({ goData }) => ({ goData })

export default connect(mapStateToProps, null)(WithGoDataRendering(ManualGO))
