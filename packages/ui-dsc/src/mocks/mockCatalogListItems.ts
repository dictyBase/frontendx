import { StockEntityType, StockSearchFieldEnum } from "dicty-graphql-schema"
import type { StockSearchResult } from "dicty-graphql-schema"
import type { StrainItem, PlasmidItem } from "../types"

/** A plasmid search result matched on its label, in stock. */
const mockPlasmidLabelMatch: StockSearchResult = {
  __typename: "StockSearchResult",
  id: "DBP0000785",
  entity: StockEntityType.Plasmid,
  field: StockSearchFieldEnum.Label,
  display_text: "pDM304",
  stock_label: "pDM304",
  summary:
    "Extrachromosomal Dictyostelium expression vector with act15 promoter; G418 resistance",
  score: 19.4,
  in_stock: true,
  stock_type: "regular",
}

/** A strain search result matched on an assay field, out of stock. */
const mockStrainAssayMatch: StockSearchResult = {
  __typename: "StockSearchResult",
  id: "DBS0351097",
  entity: StockEntityType.Strain,
  field: StockSearchFieldEnum.Assay,
  display_text: "chemotaxis chamber assay",
  stock_label: "[act15]:GFP:cbpG",
  summary: "GFP-tagged cbpG overexpressed in KAX3",
  score: 22.1,
  in_stock: false,
  stock_type: "regular",
}

/** A strain search result matched on its summary, an excluded match field. */
const mockStrainSummaryMatch: StockSearchResult = {
  __typename: "StockSearchResult",
  id: "DBS0236755",
  entity: StockEntityType.Strain,
  field: StockSearchFieldEnum.Summary,
  display_text: "Null mutant used in adhesion studies",
  stock_label: "phg1A-",
  summary: "Null mutant used in adhesion studies",
  score: 8.2,
  in_stock: true,
  stock_type: "regular",
}

/** A plain strain catalog item, as returned by browsing without a search term. */
const mockStrainCatalogItem: StrainItem = {
  __typename: "Strain",
  id: "DBS0266721",
  label: "Dd5P4-/[act15]:Hs-OCRL(D422A)",
  summary: "Strain expressing a catalytically dead OCRL construct",
  in_stock: true,
}

/** A plain plasmid catalog item, as returned by browsing without a search term. */
const mockPlasmidCatalogItem: PlasmidItem = {
  __typename: "Plasmid",
  id: "DBP0000786",
  name: "pDM323",
  summary: "GFP fusion vector with act15 promoter",
  in_stock: true,
}

export {
  mockPlasmidLabelMatch,
  mockStrainAssayMatch,
  mockStrainSummaryMatch,
  mockStrainCatalogItem,
  mockPlasmidCatalogItem,
}
