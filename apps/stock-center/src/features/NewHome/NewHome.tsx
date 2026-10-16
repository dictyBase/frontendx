import { Box, Stack } from "@mui/material"
import { infoSections } from "@dictybase/ui-dsc"
import { GeneralSearch } from "./GeneralSearch"
import { OrderingSteps } from "./OrderingSteps"
import { ResourcesAndInformation } from "./ResourcesAndInformation"
import { CatalogCard } from "./CatalogCard"
import { PhenotypeSearchCard } from "./PhenotypeSearchCard"
import { StatsBanner } from "./StatsBanner"

type LinkProperties = {
  label: string
  href: string
}

type CatalogCardItem = {
  key: string
  icon: string
  title: string
  href: string
  sublinks: Array<LinkProperties>
}
const catalogCards: Array<CatalogCardItem> = [
  {
    key: "strains",
    icon: "🧬",
    title: "Strain Catalog",
    href: "/strains",
    sublinks: [
      { label: "GWDI Strains →", href: "/strains?group=gwdi" },
      { label: "Bacterial Strains →", href: "/strains?group=bacterial" },
    ],
  },
  {
    key: "plasmids",
    icon: "🧪",
    title: "Plasmid Catalog",
    href: "/plasmids",
    sublinks: [
      { label: "Goldenbraid Plasmids →", href: "/plasmids?group=goldenbraid" },
    ],
  },
  {
    key: "phenotypes",
    icon: "🔬",
    title: "Phenotype Search",
    href: "/phenotypes",
    sublinks: [],
  },
] as const

/**
 * Root layout component for the Dicty Stock Center landing page.
 *
 * Renders the search hero, an expandable ordering guide, the catalog
 * category cards, and the resources/information footer links.
 */
const NewHome = () => (
  <Stack
    alignItems="center"
    direction="column"
    justifyContent="stretch"
    sx={{
      height: "100%",
      width: "100%",
      backgroundColor: "#f7fafc",
      display: "flex",
    }}>
    <GeneralSearch />
    <OrderingSteps />
    <StatsBanner />
    <Stack
      alignItems="center"
      sx={(theme) => ({
        width: "100%",
        pt: 3,
        backgroundColor: theme.palette.secondary.light,
      })}>
      <Box sx={{ width: "60vw" }}>
        <PhenotypeSearchCard />
      </Box>
      <Box
        sx={{
          maxWidth: "1100px",
          width: "100%",
        }}>
        <ResourcesAndInformation resources={infoSections} />
      </Box>
    </Stack>
  </Stack>
)

export { NewHome }
