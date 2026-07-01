import { describe, it, expect } from "vitest"
import type {
  CatalogStrain,
  CatalogFilters,
  FetchStrainsVariables,
  PageInfo,
  StrainsQueryResult,
  TableSortOption,
  CatalogState,
} from "../types"
import { StrainType } from "../types"

describe("Catalog Types", () => {
  it("should define CatalogFilters with StrainType enum", () => {
    const filters: CatalogFilters = {
      strainType: StrainType.All,
      searchQuery: "test",
    }
    expect(filters.strainType).toBe(StrainType.All)
    expect(filters.searchQuery).toBe("test")
  })

  it("should define CatalogStrain correctly", () => {
    const strain: CatalogStrain = {
      __typename: "Strain",
      id: "DBS-123",
      summary: "Test strain",
      label: "testStrain",
      in_stock: true,
      descriptor: "test(1-100)",
    }
    expect(strain.id).toBe("DBS-123")
    expect(strain.descriptor).toBe("test(1-100)")
  })

  it("should define PageInfo correctly", () => {
    const pageInfo: PageInfo = {
      cursor: "abc123",
      hasNextPage: true,
    }
    expect(pageInfo.hasNextPage).toBe(true)
  })

  it("should define StrainsQueryResult correctly", () => {
    const result: StrainsQueryResult = {
      strains: [],
      pageInfo: {
        cursor: null,
        hasNextPage: false,
      },
    }
    expect(result.strains).toHaveLength(0)
  })

  it("should define TableSortOption correctly", () => {
    const sort: TableSortOption = "name"
    expect(sort).toBe("name")
  })

  it("should define CatalogState correctly", () => {
    const state: CatalogState = {
      filters: {
        strainType: StrainType.Regular,
        searchQuery: "",
      },
      sortBy: "name",
      strains: [],
      pageInfo: {
        cursor: null,
        hasNextPage: false,
      },
      isLoading: false,
      error: null,
    }
    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
  })
})
