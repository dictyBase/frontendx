import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { Box, Skeleton } from "@mui/material"

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
const WikiLoader = () => (
  <Box data-testid="skeleton-loader">
    <MuiThemeProvider theme={skeletonTheme}>
      <AppBar position="static">
        <Tabs value={0}>
          <Tab label="Gene Summary" />
          <Tab label="Gene Ontology" />
          <Tab label="Orthologs" />
          <Tab label="Phenotypes" />
          <Tab label="References" />
          <Tab label="Annotations" />
        </Tabs>
      </AppBar>
    </MuiThemeProvider>
    <Box mt="10px">
      {[...Array(5)].map((item, key) => (
        <Skeleton key={key} animation="wave" />
      ))}
      <br />
      <br />
      {[...Array(5)].map((item, key) => (
        <Skeleton key={key} animation="wave" />
      ))}
      <br />
      <br />
      {[...Array(5)].map((item, key) => (
        <Skeleton key={key} animation="wave" />
      ))}
    </Box>
  </Box>
)

export default WikiLoader
