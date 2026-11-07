import { Fragment, type ReactNode } from "react"
import { match, P } from "ts-pattern"

/**
 * Returns true when `content` has something worth rendering in a details row.
 *
 * A row is considered to have no usable content when its value is:
 * - `null` or `undefined`
 * - An empty string `""`
 * - An empty array `[]`
 * - An empty React fragment `<></>`
 *
 * @param content - The row value to evaluate, as produced by the row
 *   generator functions in the details card components.
 * @returns `true` when the content is renderable, `false` when the row
 *   should be omitted entirely.
 */
const hasUsableContent = (content: ReactNode): boolean =>
  match(content)
    .with(
      P.nullish,
      "",
      [],
      { type: Fragment, props: { children: P.optional(P.nullish) } },
      () => false,
    )
    .otherwise(() => true)

export { hasUsableContent }
