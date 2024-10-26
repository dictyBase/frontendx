import { match, P } from "ts-pattern"

type Segements = {
  name: string
  subname?: string
}

const getCreateContentSlug = (segments: Segements): string =>
  match(segments)
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
