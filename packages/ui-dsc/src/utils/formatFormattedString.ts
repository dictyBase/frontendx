import type { ReactNode } from "react"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { isString, isEmpty as SisEmpty } from "fp-ts/string"
import { parseFormattedStringToDomElements } from "@dictybase/ui-common"
import { characterConverter } from "./characterConverter"

/**
 * Reports whether the given content is a non-empty string, and therefore the
 * only kind of content that needs to go through the format tag parser.
 *
 * @param content - Any ReactNode value.
 * @returns `true` when the content is a string with at least one character.
 */
const isFormattableString = (content: ReactNode): boolean =>
  isString(content) && !SisEmpty(content as string)

/**
 * Renders a string that may contain HTML character entities and the format
 * tags supported by {@link parseFormattedStringToDomElements} (i.e. `<sup>`,
 * `<sub>`, `<b>`, `<i>`) as formatted DOM elements instead of raw markup.
 *
 * Non-string and empty content is returned untouched, which makes the function
 * safe to use on any {@link ReactNode} field of a catalog item.
 *
 * @param content - A string with optional format tags, or any other ReactNode.
 * @returns The formatted DOM elements for strings, the original value otherwise.
 */
const formatFormattedString = (content: ReactNode): ReactNode =>
  pipe(
    isFormattableString(content),
    Bmatch(
      () => content,
      () =>
        pipe(
          content as string,
          characterConverter,
          parseFormattedStringToDomElements,
        ),
    ),
  )

export { formatFormattedString, isFormattableString }
