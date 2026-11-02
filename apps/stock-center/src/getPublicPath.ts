import { pipe } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { replace as Sreplace } from "fp-ts/string"

/** Matches one or more trailing slashes. */
const TRAILING_SLASHES = /\/+$/

/** Matches one or more leading slashes. */
const LEADING_SLASHES = /^\/+/

/**
 * Removes every trailing slash from a path segment.
 *
 * @param segment - The path segment to normalize.
 * @returns The segment without trailing slashes.
 */
const withoutTrailingSlashes = (segment: string): string =>
  pipe(segment, Sreplace(TRAILING_SLASHES, ""))

/**
 * Removes every leading slash from a path segment.
 *
 * @param segment - The path segment to normalize.
 * @returns The segment without leading slashes.
 */
const withoutLeadingSlashes = (segment: string): string =>
  pipe(segment, Sreplace(LEADING_SLASHES, ""))

/**
 * Builds the absolute url path of a file served from the application's
 * `public` directory.
 *
 * The stock center is deployed under a sub-path (`VITE_APP_BASENAME`), so
 * public assets have to be prefixed with it. `import.meta.env.BASE_URL` is not
 * used because the configured Vite `base` is not guaranteed to carry a
 * trailing slash, which would produce a concatenated path such as
 * `/stockcenterdocuments/report.pdf`.
 *
 * @param filePath - Path of the file relative to the `public` directory,
 *   i.e. `documents/report.pdf`.
 * @returns The absolute url path of the file, i.e.
 *   `/stockcenter/documents/report.pdf`.
 */
const getPublicPath = (filePath: string): string => {
  const base = pipe(
    import.meta.env.VITE_APP_BASENAME,
    OfromNullable,
    OgetOrElse(() => ""),
    withoutTrailingSlashes,
    withoutLeadingSlashes,
  )
  const file = withoutLeadingSlashes(filePath)
  return base ? `/${base}/${file}` : `/${file}`
}

export { getPublicPath }
