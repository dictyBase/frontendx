import { useLocation } from "react-router-dom"
import { pipe } from "fp-ts/function"
import { split as Ssplit, isEmpty as SisEmpty, Eq as SEq } from "fp-ts/string"
import {
  filter as ROAfilter,
  difference as ROAdifference,
  prependAll as ROAprependAll,
  reduce as ROAreduce,
} from "fp-ts/ReadonlyArray"

const viewModes = ["show", "editable", "edit", "addpage"]

const useContentPath = () => {
  const { pathname } = useLocation()
  return pipe(
    pathname,
    Ssplit("/"),
    ROAfilter((bs) => !SisEmpty(bs)),
    ROAdifference(SEq)(viewModes),
    ROAprependAll("/"),
    ROAreduce("", (b, a) => b + a),
  )
}

export { useContentPath }
