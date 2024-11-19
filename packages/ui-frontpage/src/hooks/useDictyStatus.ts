import { useState, useEffect } from "react"
import { pipe } from "fp-ts/function"
import { Option, none, some } from "fp-ts/Option"
import {
  Do as TEDo,
  let as TElet,
  bind as TEbind,
  tryCatch as TEtryCatch,
} from "fp-ts/TaskEither"
import { UptimeProperties } from "../types"

type StatusData = Array<UptimeProperties>

const useDictyStatus = () => {
  const [statuses, setStatuses] = useState<Option<StatusData>>(none)

  useEffect(() => {
    const getStatus = async () => {
      const statusTask = pipe(
        TEDo,
        TEbind("response", () =>
          TEtryCatch(
            () =>
              fetch(
                "https://raw.githubusercontent.com/dictybase-docker/uptime/master/history/summary.json",
              ),
            () => {
              setStatuses(none)
            },
          ),
        ),
        TEbind("data", ({ response }) =>
          TEtryCatch(
            (): Promise<StatusData> => response.json(),
            () => {
              setStatuses(none)
            },
          ),
        ),
        TElet("final", ({ data }) => {
          setStatuses(some(data))
        }),
      )
      await statusTask()
    }
    getStatus()
  }, [setStatuses])
  return statuses
}

export { useDictyStatus }
