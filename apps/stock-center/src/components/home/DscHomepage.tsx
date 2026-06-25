import { Container, Box } from "@mui/material"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import {
  CatalogCard,
  GridLayout,
  InfoCard,
  SectionTitle,
  StatCard,
  catalogs,
  infoSections,
  stats,
} from "@dictybase/ui-dsc"
import { Hero } from "./Hero"

const DSCHomepage = () => (
  <Container sx={{ maxWidth: "70 !important" }}>
    <Hero title="Welcome to Dicty Stock Center (DSC)" />
    <Box sx={{ mb: 6 }}>
      <GridLayout minColumnWidth="200px" gap={3}>
        {pipe(
          stats,
          Amap((stat) => (
            <StatCard
              key={stat.label}
              number={stat.number}
              label={stat.label}
            />
          )),
        )}
      </GridLayout>
    </Box>
    <Box sx={{ mb: 6 }}>
      <SectionTitle>Browse Catalogs</SectionTitle>
      <GridLayout minColumnWidth="200px" gap={3}>
        {pipe(
          catalogs,
          Amap((catalog) => (
            <CatalogCard
              key={catalog.title}
              icon={catalog.icon}
              title={catalog.title}
              description={catalog.description}
              href={catalog.href}
            />
          )),
        )}
      </GridLayout>
    </Box>

    <Box sx={{ mb: 6 }}>
      <SectionTitle>Resources & Information</SectionTitle>
      <GridLayout minColumnWidth="200px" gap={3}>
        {pipe(
          infoSections,
          Amap((section) => (
            <InfoCard
              key={section.title}
              title={section.title}
              icon={section.icon}
              links={section.links}
            />
          )),
        )}
      </GridLayout>
    </Box>
  </Container>
)

export { DSCHomepage }
