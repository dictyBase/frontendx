import { pipe } from "fp-ts/function"
import { match as Omatch } from "fp-ts/Option"
import { useDictyStatus } from "./hooks/useDictyStatus"
import { StatusPopover } from "./StatusPopover"

const StatusReportContainer = () => {
  const data = useDictyStatus()
  return pipe(
    data,
    Omatch(
      () => <></>,
      (summaries) => <StatusPopover summaries={summaries} />,
    ),
  )
}

export { StatusReportContainer }
