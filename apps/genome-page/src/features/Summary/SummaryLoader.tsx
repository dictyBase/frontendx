import React from "react"
import Layout from "components/layout/Layout"
import { Box, Skeleton } from "@mui/material"

type Props = {
  /** Gene name */
  gene: string
}

/**
 * Loading screen for Summary page
 */

const SummaryLoader = ({ gene }: Props) => (
  <Box mt={"10px"} data-testid="skeleton-loader">
    <Layout gene={gene}>
      {[...Array(10)].map((i) => (
        <Skeleton key={i} animation="wave" />
      ))}
    </Layout>
  </Box>
)

export default SummaryLoader
