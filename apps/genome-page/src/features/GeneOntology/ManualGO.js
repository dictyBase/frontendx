// @flow
import React from "react"
import { connect } from "react-redux"
import Grid from "@material-ui/core/Grid"
import DisplayTable from "./DisplayTable"
import WithGoDataRendering from "./WithGoDataRendering"
import Panel from "common/components/Panel"
import { GoHeaderStyle } from "styles/style"

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
    <Grid container>
      <Grid item sm={12} md={12} lg={12} xl={12}>
        <Panel title="Molecular Function">
          <DisplayTable data={data} />
        </Panel>
        <Panel title="Biological Process">
          <DisplayTable data={data} />
        </Panel>
        <Panel title="Cellular Composition">
          <DisplayTable data={data} />
        </Panel>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = ({ goData }) => ({ goData })

export default connect(
  mapStateToProps,
  null,
)(WithGoDataRendering(ManualGO))
