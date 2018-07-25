// @flow
import React from "react"
import { connect } from "react-redux"
import Grid from "@material-ui/core/Grid"
import DisplayTable from "./DisplayTable"
import WithGoDataRendering from "./WithGoDataRendering"
import { GoHeaderStyle } from "styles/style"

type Props = {
  /** The data fetched from the API */
  goData: Object,
}

/**
 * Filters and shares only the Electronic GO data (IEA)
 */

export const ElectronicGO = (props: Props) => {
  const data = props.goData.data.filter(code => code.evidence === "IEA")

  return (
    <Grid container justify="center">
      <Grid item>
        <GoHeaderStyle>
          <h3>Molecular Function ({data.length})</h3>
        </GoHeaderStyle>
        <DisplayTable data={data} />
        <br />
        <GoHeaderStyle>
          <h3>Biological Process ({data.length})</h3>
        </GoHeaderStyle>
        <DisplayTable data={data} />
        <br />
        <GoHeaderStyle>
          <h3>Cellular Composition ({data.length})</h3>
        </GoHeaderStyle>
        <DisplayTable data={data} />
      </Grid>
    </Grid>
  )
}

const mapStateToProps = ({ goData }) => ({ goData })

export default connect(
  mapStateToProps,
  null,
)(WithGoDataRendering(ElectronicGO))
