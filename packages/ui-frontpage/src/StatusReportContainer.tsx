import { Box } from "@mui/material"
import { pipe } from "fp-ts/function"
import { match as Omatch } from "fp-ts/Option"
import { useDictyStatus } from "./hooks/useDictyStatus"
import { StatusPopover } from "./StatusPopover"
import { SiteStatusUnavailable } from "./SiteStatusUnavailable"

/*
 * The status row swaps between the "unavailable" placeholder and the loaded
 * popover once the async fetch resolves. Reserve a stable height so that swap
 * (and the initial render) does not shift everything below it on the page.
 */
const StatusReportContainer = () => {
  const data = useDictyStatus()
  return (
    <Box sx={{ minHeight: "2.5rem", display: "flex", alignItems: "center" }}>
      {pipe(
        data,
        Omatch(
          () => <SiteStatusUnavailable />,
          (summaries) => <StatusPopover summaries={summaries} />,
        ),
      )}
    </Box>
  )
}

export { StatusReportContainer }
