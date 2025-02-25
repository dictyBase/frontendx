import { pipe } from "fp-ts/function"
import { Ord as NOrd } from "fp-ts/number"
import { Ord, contramap } from "fp-ts/Ord"
import { ListContentByNamespaceQuery } from "dicty-graphql-schema"
import { parseISO, getTime } from "date-fns/fp"

const ordByUpdatedAt: Ord<
  ListContentByNamespaceQuery["listContentByNamespace"][0]
> = pipe(
  NOrd,
  contramap(({ updated_at }) => pipe(updated_at, parseISO, getTime)),
)

export { ordByUpdatedAt }
