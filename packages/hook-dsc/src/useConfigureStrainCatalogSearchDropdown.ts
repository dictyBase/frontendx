import { strainConfig } from "./graphql_config"

export function useConfigureStrainCatalogSearchDropdown() {
  return strainConfig().map((config) => ({
    label: config.label,
    value: config.value,
  }))
}
