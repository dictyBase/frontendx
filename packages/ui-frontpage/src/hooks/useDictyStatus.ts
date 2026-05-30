import { useState, useEffect } from "react"
import { pipe } from "fp-ts/function"
import {
  Option,
  none,
  some,
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import {
  Do as TEDo,
  let as TElet,
  bind as TEbind,
  tryCatch as TEtryCatch,
} from "fp-ts/TaskEither"
import { UptimeProperties } from "../types"

type StatusData = Array<UptimeProperties>

const DEFAULT_STATUS_JSON_URL =
  "https://raw.githubusercontent.com/dictybase-docker/uptime/master/history/summary.json"

/*
 * Source for the uptime summary. Defaults to the Upptime-generated file on
 * GitHub, but can be overridden (via VITE_APP_STATUS_JSON) to point at a
 * dictybase-served proxy so the request stays on a trusted, cacheable origin
 * and off the page's critical path.
 */
const STATUS_JSON_URL = pipe(
  OfromNullable(import.meta.env.VITE_APP_STATUS_JSON),
  OgetOrElse(() => DEFAULT_STATUS_JSON_URL),
)

const useDictyStatus = () => {
  const [statuses, setStatuses] = useState<Option<StatusData>>(none)

  useEffect(() => {
    const getStatus = async () => {
      const statusTask = pipe(
        TEDo,
        TEbind("response", () =>
          TEtryCatch(
            () => fetch(STATUS_JSON_URL),
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
