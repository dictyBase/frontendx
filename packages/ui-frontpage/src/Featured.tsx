import { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Container, Grid, Typography, Button } from "@mui/material"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import SearchIcon from "@mui/icons-material/Search"
import TableChartIcon from "@mui/icons-material/TableChart"

type FeaturedLink = {
  icon: ReactNode
  name: string
  to: string
  description: string
  disabled: boolean
}

const featuredLinks: Array<FeaturedLink> = [
  {
    icon: <ShoppingCartIcon />,
    name: "Dicty Stock Center",
    to: `${import.meta.env.VITE_APP_STOCKCENTER_URL}`,
    description: "Central repository for Dictyostelium discoideum strains.",
    disabled: false,
  },
  {
    icon: <SearchIcon />,
    name: "Genome Browser",
    to: "http://dictybase.org/tools/jbrowse",
    description:
      "Search using a sequence name, gene name, locus, or other landmark.",
    disabled: false,
  },
  {
    icon: <TableChartIcon />,
    name: "Gene Page",
    to: "/#",
    description:
      "Provides extensive information about a given gene, including links to all its associated sequences, such as Curated Models, Gene Predictions, GenBank Sequences, and ESTs. (Coming Soon)",
    disabled: true,
  },
]

const Featured = () => (
  <Container
    sx={{
      height: "100%",
      paddingTop: "1rem",
      paddingBottom: "1rem",
      borderRadius: "10px",
      backgroundColor: "#eff8fb",
      color: "#04313f",
      boxShadow:
        "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    }}>
    <Grid spacing={1} direction="column" container>
      <Grid item>
        <Typography color="secondary" variant="h1">
          Featured
        </Typography>
      </Grid>
      {pipe(
        featuredLinks,
        Amap(({ icon, name, to, description, disabled }) => (
          <Grid key={name} item>
            <Link
              to={to}
              reloadDocument
              style={{
                pointerEvents: disabled ? "none" : "auto",
              }}>
              <Button disabled={disabled} color="primary" startIcon={icon}>
                <Typography sx={{ textDecoration: "underline" }} variant="h2">
                  {name}
                </Typography>
              </Button>
            </Link>
            <Typography>{description}</Typography>
          </Grid>
        )),
      )}
    </Grid>
  </Container>
)

export { Featured }
