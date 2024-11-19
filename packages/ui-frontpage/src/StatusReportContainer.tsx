import { pipe } from "fp-ts/function"
import { match as Omatch } from "fp-ts/Option"
import { useDictyStatus } from "./hooks/useDictyStatus"
import { StatusReportDisplay } from "./StatusReportDisplay"

const StatusReportContainer = () => {
  const data = useDictyStatus()
  return pipe(
    data,
    Omatch(
      () => <></>,
      (summaries) => <StatusReportDisplay summaries={summaries} />,
    ),
  )
}

export { StatusReportContainer }
