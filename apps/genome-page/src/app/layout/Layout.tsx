import React from "react"
import { Link, useLocation, useParams } from "react-router-dom"
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
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const { id } = useParams()
  const { pathname } = useLocation()
  const [tabValue, setTabValue] = React.useState(getTabValue(pathname))

  const handleChange = (event: React.ChangeEvent<{}>, value: number) => {
    setTabValue(value)
  }

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <PageHeader name={id} />
        <LegacyLinkSnackbar id={id} />
        <AppBar position="static">
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="Gene Summary" component={Link} to={`/${id}`} />
            <Tab
              label="Gene Ontology"
              component={Link}
              to={`/${id}/goannotations`}
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
