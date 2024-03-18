import { match, P } from "ts-pattern"
import { CatalogItem } from "../types"

const getCatalogItemPathAndDescriptor = (item: CatalogItem) =>
  match(item)
    .with({ name: P.string }, (plasmid) => ({
      itemPath: "plasmids",
      itemDescriptor: plasmid.name,
    }))
    .with({ label: P.string }, (strain) => ({
      itemPath: "strains",
      itemDescriptor: strain.label,
    }))
    .otherwise(() => ({
      itemPath: "",
      itemDescriptor: "",
    }))

export { getCatalogItemPathAndDescriptor as getCatalogItemDescriptor }
