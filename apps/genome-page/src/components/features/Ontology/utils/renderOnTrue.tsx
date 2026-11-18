import { type ReactElement } from "react"
import { flow } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"

const renderOnTrue = (component: ReactElement) =>
  flow(
    Bmatch(
      () => <></>,
      () => component,
    ),
  )

export { renderOnTrue }
