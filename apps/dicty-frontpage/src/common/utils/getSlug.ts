import { match, P } from "ts-pattern"

type ContentPageRouteParameters = {
  name?: string
  subname?: string
  lastSegment?: string
}

/**
 * Intended for use in general pages that deal with Content data under route path
 * `/:section/:name` or `/:section/:name/:subname`
 *
 * The returned string represents the slug of the url
 */
const getSlug = (routeParameters: ContentPageRouteParameters): string =>
  match(routeParameters)
    .with({ subname: P.select(P.string) }, (subname) => subname)
    .with({ name: P.select(P.string) }, (name) => name)
    .with({ lastSegment: P.select(P.string) }, (lastSegment) => lastSegment)
    .otherwise(() => "")

export { getSlug }
