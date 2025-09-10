import { type StrainItem, type PlasmidItem } from "../types"

const mockStrainCatalogItem: StrainItem = {
  __typename: "Strain",
  id: "DBS-1",
  summary: "This is a test item",
  label: "testStrain",
  in_stock: true,
}

const mockPlasmidCatalogItem: PlasmidItem = {
  __typename: "Plasmid",
  id: "DBP-1",
  summary: "This is a test item",
  name: "testPlasmid",
  in_stock: true,
}
export { mockStrainCatalogItem, mockPlasmidCatalogItem }
