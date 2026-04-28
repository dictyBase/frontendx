import { strainGroupFilterEntries } from "./graphql_config"

export function useConfigureStrainCatalogSearchDropdown() {
  return strainGroupFilterEntries.map((config) => ({
    label: config.label,
    value: config.value,
  }))
}
