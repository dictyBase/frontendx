import React from "react"
import type { ReactNode } from "react"

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
const hasUsableContent = (content: ReactNode): boolean => {
  if (content === null || content === undefined) return false
  if (typeof content === "string") return content !== ""
  if (Array.isArray(content)) return content.length > 0
  if (React.isValidElement(content)) {
    if (content.type !== React.Fragment) return true
    const { children } = content.props as { children?: ReactNode }
    return children !== undefined && children !== null
  }
  return true
}

export { hasUsableContent }
