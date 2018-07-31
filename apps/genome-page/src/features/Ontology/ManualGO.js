// @flow
import React from "react"
import { connect } from "react-redux"
import Grid from "@material-ui/core/Grid"
import WithGoDataRendering from "./WithGoDataRendering"
import PanelWrapper from "common/components/PanelWrapper"

type Props = {
  /** The data fetched from the API */
  goa: Object,
}

/**
 * Filters and shares only the Manual GO data (IMP, IGI, IDA, IBA)
 */

export const ManualGO = (props: Props) => {
  // const data = props.goa.data.filter(
  //   code =>
  //     code.evidence === "IMP" ||
  //     code.evidence === "IGI" ||
  //     code.evidence === "IDA" ||
  //     code.evidence === "IBA",
  // )
  return (
    <Grid container>
      <Grid item sm={12} md={12} lg={12} xl={12}>
        <PanelWrapper title="Molecular Function">
          <div>data table coming later</div>
        </PanelWrapper>
        <PanelWrapper title="Biological Process">
          <div>data table coming later</div>
        </PanelWrapper>
        <PanelWrapper title="Cellular Composition">
          <div>data table coming later</div>
        </PanelWrapper>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = ({ goa }) => ({ goa })

export default connect(
  mapStateToProps,
  null,
)(WithGoDataRendering(ManualGO))
