import { Box, Typography, Card, CardContent } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { infoSections } from "@dictybase/ui-dsc"
import { GeneralSearch } from "./GeneralSearch"
import { ResourcesAndInformation } from "./ResourcesAndInformation"
import { CatalogCard } from "./CatalogCard"

const catalogCards = [
  { key: "strains", icon: "🧬", title: "Strain Catalog", href: "/strains" },
  {
    key: "plasmids",
    icon: "🧪",
    title: "Plasmid Catalog",
    href: "/plasmids",
  },
  {
    key: "phenotypes",
    icon: "🔬",
    title: "Phenotype Search",
    href: "/phenotypes",
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
      {catalogCards.map(({ key, icon, title, href }) => (
        <CatalogCard key={key} icon={icon} title={title} href={href} />
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
