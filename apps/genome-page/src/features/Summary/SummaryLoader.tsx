import React from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import Layout from "app/layout/Layout"

type Props = {
  /** Gene name */
  gene: string
}

/**
 * Loading screen for Summary page
 */

const SummaryLoader = ({ gene }: Props) => (
  <div data-testid="skeleton-loader">
    <Layout gene={gene}>
      <SkeletonTheme baseColor="#d1d1d1">
        <Skeleton count={10} />
      </SkeletonTheme>
    </Layout>
  </div>
)

export default SummaryLoader
