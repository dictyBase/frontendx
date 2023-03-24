import { TypedDocumentNode } from "@apollo/client"
import { StrainListFilter } from "dicty-graphql-schema"

export interface GraphqlQueryVarProps {
  cursor: number
  limit: number
}

export interface StrainCatalogSearchProps {
  searchParams: URLSearchParams
  value: string
}

export interface Strain {
  id: string
  label: string
  summary: string
  in_stock: boolean
}

export interface ListStrainsData {
  nextCursor: number
  totalCount: number
  strains: Strain[]
}

export interface StrainLists {
  listStrains: ListStrainsData
}

export interface ChipDisplay {
  label: string
  value: string
}

export interface BaseConfigMember {
  dataField: string
  graphqlQuery: TypedDocumentNode
}

export interface SearchConfigMember extends BaseConfigMember {
  label: string
  value: string
  graphqlFilter: StrainListFilter
}

export interface ConfigureStrainCatalogSearchGraphql {
  dataField: string
  variables: {
    cursor: number
    limit: number
    filter: StrainListFilter
  }
}
