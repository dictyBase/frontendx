import { Box } from "@mui/material"
import { infoSections } from "@dictybase/ui-dsc"
import { GeneralSearch } from "./GeneralSearch"
import { OrderingSteps } from "./OrderingSteps"
import { ResourcesAndInformation } from "./ResourcesAndInformation"
import { CatalogCard } from "./CatalogCard"
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
  <Box
    sx={{
      minHeight: "100vh",
      width: "100%",
      backgroundColor: "#f7fafc",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      pt: 7,
      pb: 8,
    }}>
    <GeneralSearch />
    <OrderingSteps />
    <StatsBanner />
    <Box
      sx={{
        width: "100%",
        maxWidth: "1100px",
        mt: 2,
        mb: 10,
        display: "flex",
        alignItems: "stretch",
        gap: 4,
        justifyContent: "center",
        flexWrap: "wrap",
      }}>
      {catalogCards.map(({ key, icon, title, href, sublinks }) => (
        <CatalogCard
          key={key}
          icon={icon}
          title={title}
          href={href}
          sublinks={sublinks}
        />
      ))}
    </Box>
    <Box
      sx={{
        maxWidth: "1100px",
        width: "100%",
      }}>
      <ResourcesAndInformation resources={infoSections} />
    </Box>
  </Box>
)

export { NewHome }
