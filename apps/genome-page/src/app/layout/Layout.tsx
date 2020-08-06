import React from "react"
import { Link, useLocation } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import LegacyLinkSnackbar from "common/components/LegacyLinkSnackbar"
import PageHeader from "common/components/PageHeader"

const getTabValue = (pathname: string) => {
  const subroute = pathname.split("/").splice(-1).join()

  switch (subroute) {
    case "goannotations":
      return 1
    default:
      return 0
  }
}

type Props = {
  /** Children components to display in the layout */
  children: React.ReactNode
  /** Name of gene */
  gene: string
}

const Layout = ({ children, gene }: Props) => {
  const { pathname } = useLocation()
  const [tabValue, setTabValue] = React.useState(getTabValue(pathname))

  const handleChange = (event: React.ChangeEvent<{}>, value: number) => {
    setTabValue(value)
  }

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <PageHeader gene={gene} />
        <LegacyLinkSnackbar gene={gene} />
        <AppBar position="static">
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="Gene Summary" component={Link} to={`/${gene}`} />
            <Tab
              label="Gene Ontology"
              component={Link}
              to={`/${gene}/goannotations`}
            />
          </Tabs>
        </AppBar>
        {children}
      </Grid>
    </Grid>
  )
}

export { getTabValue }
export default Layout
