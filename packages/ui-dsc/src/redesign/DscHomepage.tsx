import { Box, Typography } from "@mui/material"
import { CatalogCard } from "./CatalogCard"
import { catalogs, infoSections, navigation, stats } from "./content"
import { Footer } from "./Footer"
import { GridLayout } from "./GridLayout"
import { Header } from "./Header"
import { Hero } from "./Hero"
import { InfoCard } from "./InfoCard"
import { PageContainer } from "./PageContainer"
import { SectionTitle } from "./SectionTitle"
import { StatCard } from "./StatCard"

const DSCHomepage = () => (
  <Box>
    <Header navigation={navigation} logoHref="/" />
    <PageContainer>
      <Hero
        title="Dictyostelium Stock Center"
        warning="Due to the renovation of our lab, we are not processing any orders until further notice.">
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
        <SectionTitle>Quick Stats</SectionTitle>
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
    </PageContainer>
    <Footer
      title="Dictyostelium Stock Center"
      subtitle="Supporting research worldwide"
    />
  </Box>
)

export { DSCHomepage }
