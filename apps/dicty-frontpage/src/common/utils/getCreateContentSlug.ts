import { match, P } from "ts-pattern"

type ContentPageRouteParameters = {
  name: string
  subname?: string
}

const getCreateContentSlug = (
  routeParameters: ContentPageRouteParameters,
): string =>
  match(routeParameters)
    .with(
      { subname: P.select(P.intersection(P.string, P.not(""))) },
      (subname) => subname as string,
    )
    .with(
      { name: P.select(P.intersection(P.string, P.not(""))) },
      (name) => name,
    )
    .otherwise(() => "")

export { getCreateContentSlug }
