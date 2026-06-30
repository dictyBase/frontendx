import type { Strain } from "dicty-graphql-schema"
import { StrainType } from "dicty-graphql-schema"

// Catalog strain data with descriptor field
type CatalogStrain = Pick<
  Strain,
  "__typename" | "id" | "summary" | "label" | "in_stock"
> & {
  descriptor: string
}

// Filter state for the catalog
type CatalogFilters = {
  strainType: StrainType
  searchQuery: string
}

// Query variables for fetching strains
type FetchStrainsVariables = {
  cursor?: string
  limit: number
  filter?: string
}

// Pagination info for infinite scroll
type PageInfo = {
  cursor: string | null
  hasNextPage: boolean
}

// Response from strain list query
type StrainsQueryResult = {
  strains: Array<CatalogStrain>
  pageInfo: PageInfo
}

// Table sort options
type TableSortOption = "name" | "recent"

// Catalog state shape
type CatalogState = {
  filters: CatalogFilters
  sortBy: TableSortOption
  strains: Array<CatalogStrain>
  pageInfo: PageInfo
  isLoading: boolean
  error: string | null
}

export type {
  CatalogStrain,
  CatalogFilters,
  FetchStrainsVariables,
  PageInfo,
  StrainsQueryResult,
  TableSortOption,
  CatalogState,
}
export { StrainType }
