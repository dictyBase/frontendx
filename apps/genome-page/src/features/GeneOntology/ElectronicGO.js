// @flow
import React from "react"
import { connect } from "react-redux"
import Grid from "@material-ui/core/Grid"
import WithGoDataRendering from "./WithGoDataRendering"
import Panel from "common/components/Panel"

type Props = {
  /** The data fetched from the API */
  goa: Object,
}

/**
 * Filters and shares only the Electronic GO data (IEA)
 */

export const ElectronicGO = (props: Props) => {
  const data = props.goa.data.filter(code => code.evidence === "IEA")

  return (
    <Grid container>
      <Grid item sm={12} md={12} lg={12} xl={12}>
        <Panel title="Molecular Function">
          <div>data table coming later</div>
        </Panel>
        <Panel title="Biological Process">
          <div>data table coming later</div>
        </Panel>
        <Panel title="Cellular Composition">
          <div>data table coming later</div>
        </Panel>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = ({ goa }) => ({ goa })

export default connect(
  mapStateToProps,
  null,
)(WithGoDataRendering(ElectronicGO))
