import { Box, Typography, Card, CardContent } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { infoSections } from "@dictybase/ui-dsc"
import { GeneralSearch } from "./GeneralSearch"
import { ResourcesAndInformation } from "./ResourcesAndInformation"

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
      pt: 12,
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
        <Card
          key={key}
          elevation={0}
          sx={{
            flex: "1 1 240px",
            maxWidth: 320,
            borderRadius: "16px",
            border: "2px solid transparent",
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            transition: "all 0.3s ease",
            display: "flex",
            flexDirection: "column",
            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
              borderColor: "#004080",
            },
          }}>
          <CardContent
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              p: 4,
              "&:last-child": { pb: 4 },
            }}>
            <Typography sx={{ fontSize: "3rem", lineHeight: 1 }}>
              {icon}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontSize: "1.15rem",
                fontWeight: 700,
                color: "#1a202c",
                textAlign: "center",
              }}>
              {title}
            </Typography>
            <Box
              component={RouterLink}
              to={href}
              sx={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#3182ce",
                textDecoration: "none",
                "&:hover": { color: "#1a56db" },
              }}>
              Explore →
            </Box>
          </CardContent>
        </Card>
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
