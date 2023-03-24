import { strainConfig } from "./graphql-config"

export function useConfigureStrainCatalogSearchDropdown() {
  return strainConfig().map((config) => ({
    label: config.label,
    value: config.value,
  }))
}
