import { Box, Stack } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { infoSections } from "@dictybase/ui-dsc"
import { GeneralSearch } from "./GeneralSearch"
import { OrderingSteps } from "./OrderingSteps"
import { ResourcesAndInformation } from "./ResourcesAndInformation"
import { CatalogCardB } from "./CatalogCardB"
import { PhenotypeSearchCard } from "./PhenotypeSearchCard"
import { StatsBanner } from "./StatsBanner"

type LinkProperties = {
  label: string
  href: string
}

type CatalogCardItem = {
  key: string
  description: string
  links: Array<LinkProperties>
}
const catalogCards: Array<CatalogCardItem> = [
  {
    key: "full",
    description:
      "Explore the full catalog of strains and plasmids. Search by various stock attributes such as ID, descriptor, genotype, characteristic, assay, and more.",
    links: [
      {
        label: "Full Catalog",
        href: "/catalog",
      },
      { label: "Explore →", href: "/catalog" },
    ],
  },
  {
    key: "strain",
    description:
      "Discover over 12,000 authenticated strains including mutant alleles, null lines, and wild isolates.",
    links: [
      { label: "Strain Catalog", href: "/strains" },
      { label: "GWDI Strains →", href: "/strains?group=gwdi" },
      { label: "Bacterial Strains →", href: "/strains?group=bacterial" },
    ],
  },
  {
    key: "plasmid",
    description:
      "Targeted gene disruption vectors, GFP/RFP tags, overexpression constructs, and shuttle vectors. ",
    links: [
      {
        label: "Plasmid Catalog",
        href: "/plasmids",
      },
      { label: "Goldenbraid Plasmids →", href: "/plasmids?group=goldenbraid" },
    ],
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
    sx={(t) => ({
      height: "100%",
      width: "100%",
      backgroundColor: t.palette.primary.light,
      display: "flex",
    })}>
    <GeneralSearch />
    <OrderingSteps />
    <Grid
      container
      spacing={3}
      sx={{ px: 2, maxWidth: { xl: "65%", lg: "100%", md: "65%" } }}>
      {pipe(
        catalogCards,
        Amap(({ links, description, key }) => (
          <Grid xs={12} md={12} lg={4} xl={4} key={key}>
            <CatalogCardB links={links} description={description} />
          </Grid>
        )),
      )}
    </Grid>
    <StatsBanner />
    <Stack
      alignItems="center"
      sx={(theme) => ({
        width: "100%",
        pt: 3,
        backgroundColor: theme.palette.primary.light,
      })}>
      <Grid
        container
        spacing={2}
        sx={{ px: 2, maxWidth: { xl: "50%", lg: "100%", md: "65%" } }}>
        <Grid xs={12}>
          <PhenotypeSearchCard />
        </Grid>
      </Grid>
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
