import { Box, Typography, Container } from "@mui/material"
import { CatalogCard } from "./CatalogCard"
import { catalogs, infoSections, stats } from "./content"
import { GridLayout } from "./GridLayout"
import { Hero } from "./Hero"
import { InfoCard } from "./InfoCard"
// import { PageContainer as Container } from "./PageContainer"
import { SectionTitle } from "./SectionTitle"
import { StatCard } from "./StatCard"

const DSCHomepage = () => (
  <Box>
    <Container>
      <Hero title="Dictyostelium Stock Center">
        <Typography variant="body1" paragraph>
          The Dictyostelium Stock Center provides a central repository for
          Dictyostelium discoideum strains, plasmids, and other materials.
        </Typography>
        <Typography variant="body1">
          Browse our catalogs, place orders, and access resources for your
          research.
        </Typography>
      </Hero>

      <Box sx={{ mb: 6 }}>
        <GridLayout minColumnWidth="200px" gap={3}>
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              number={stat.number}
              label={stat.label}
            />
          ))}
        </GridLayout>
      </Box>

      <Box sx={{ mb: 6 }}>
        <SectionTitle>Browse Catalogs</SectionTitle>
        <GridLayout minColumnWidth="250px" gap={3}>
          {catalogs.map((catalog) => (
            <CatalogCard
              key={catalog.title}
              icon={catalog.icon}
              title={catalog.title}
              description={catalog.description}
              href={catalog.href}
            />
          ))}
        </GridLayout>
      </Box>

      <Box sx={{ mb: 6 }}>
        <SectionTitle>Resources & Information</SectionTitle>
        <GridLayout minColumnWidth="250px" gap={3}>
          {infoSections.map((section) => (
            <InfoCard
              key={section.title}
              title={section.title}
              icon={section.icon}
              links={section.links}
            />
          ))}
        </GridLayout>
      </Box>
    </Container>
  </Box>
)

export { DSCHomepage }
