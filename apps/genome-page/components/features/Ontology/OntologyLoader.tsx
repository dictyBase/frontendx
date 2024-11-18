import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Box from "@material-ui/core/Box"
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { useRouter } from "next/router"
import { Layout } from "components/layout/Layout"
import { Loader } from "components/Loader"

const skeletonTheme = createTheme({
  overrides: {
    MuiTab: {
      root: {
        textTransform: "none",
      },
    },
    MuiTabs: {
      root: {
        backgroundColor: "#DFE8F6",
        color: "#000",
      },
      indicator: {
        backgroundColor: "#858780",
        height: "3px",
      },
    },
  },
})

/**
 * Loading screen for GO page
 */
const OntologyLoader = () => {
  const { query } = useRouter()
  const geneId = query.id as string
  return (
    <Layout
      gene={geneId}
      title={`GO Annotations for ${geneId}`}
      description={`Gene Ontology Annotations for ${geneId}`}>
      <Box data-testid="skeleton-loader">
        <MuiThemeProvider theme={skeletonTheme}>
          <AppBar position="static">
            <Tabs value={0}>
              <Tab label="All GO" />
              <Tab label="Experimental GO" />
              <Tab label="Manual GO" />
              <Tab label="Electronic GO" />
            </Tabs>
          </AppBar>
        </MuiThemeProvider>
        <Box mt="10px">
          <Loader />
        </Box>
      </Box>
    </Layout>
  )
}

export { OntologyLoader }
