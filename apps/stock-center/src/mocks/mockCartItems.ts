import { type StrainCartItem, type PlasmidCartItem } from "../types"

const mockStrainCartItem: StrainCartItem = {
  __typename: "Strain",
  id: "DBS-1",
  summary: "This is a test item",
  label: "testStrain",
  fee: 10,
  in_stock: true,
}

const mockPlasmidCartItem: PlasmidCartItem = {
  __typename: "Plasmid",
  id: "DBP-1",
  summary: "This is a test item",
  name: "testPlsamid",
  fee: 15,
  in_stock: true,
}
export { mockStrainCartItem, mockPlasmidCartItem }
