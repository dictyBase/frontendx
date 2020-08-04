import React from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import PageHeader from "common/components/PageHeader"

type Props = {
  /** Gene name or ID (from routing params) */
  id: string
}

/**
 * Loading screen for Summary page
 */

const SummaryLoader = ({ id }: Props) => (
  <div data-testid="skeleton-loader">
    <PageHeader name={id} />
    <AppBar position="static">
      <Tabs value={0}>
        <Tab label="Gene Summary" />
        <Tab label="Gene Ontology" />
      </Tabs>
    </AppBar>
    <SkeletonTheme color="#d1d1d1">
      <Skeleton count={10} />
      {/* <br />
      <br />
      <Skeleton count={10} /> */}
    </SkeletonTheme>
  </div>
)

export default SummaryLoader
