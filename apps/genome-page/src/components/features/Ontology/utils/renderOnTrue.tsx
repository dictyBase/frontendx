import { flow } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"

const renderOnTrue = (component: JSX.Element) =>
  flow(
    Bmatch(
      () => <></>,
      () => component,
    ),
  )

export { renderOnTrue }
