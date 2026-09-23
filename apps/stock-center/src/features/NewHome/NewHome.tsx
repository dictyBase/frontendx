import { Box } from "@mui/material"
import { infoSections } from "@dictybase/ui-dsc"
import { GeneralSearch } from "./GeneralSearch"
import { ResourcesAndInformation } from "./ResourcesAndInformation"
import { CatalogCard } from "./CatalogCard"

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
    sublinks: [],
  },
  {
    key: "phenotypes",
    icon: "🔬",
    title: "Phenotype Search",
    href: "/phenotypes",
    sublinks: [],
  },
] as const

const NewHome = () => (
  <Box
    sx={{
      minHeight: "100vh",
      backgroundColor: "#f7fafc",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      pt: 8,
      px: 3,
      pb: 8,
    }}>
    <GeneralSearch />
    <Box
      sx={{
        width: "100%",
        maxWidth: "1100px",
        mt: 8,
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
