import { match, P } from "ts-pattern"
import { CatalogItem } from "../types"

const getCatalogItemDescriptor = (item: CatalogItem) =>
  match(item)
    .with({ name: P.string }, (plasmid) => plasmid.name)
    .with({ label: P.string }, (strain) => strain.label)
    .otherwise(() => "")

export { getCatalogItemDescriptor }
