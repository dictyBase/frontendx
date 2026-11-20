import React from "react"
import { Link } from "react-router-dom"
import { Grid, AppBar, Box, Tabs, Tab, Typography } from "@mui/material"

enum TabValues {
  SUMMARY,
  GOANNOTATIONS,
  PHENOTYPES,
  REFERENCES,
}

type Properties = {
  tabValue: TabValues
  children: React.ReactNode
  gene: string
  title: string
  description: string
}

const tabStyle = {
  color: "rgb(0, 0, 0)",
}

const Layout = ({
  tabValue,
  children,
  gene,
  title,
  description,
}: Properties) => (
  <Grid container justifyContent="center">
    <Grid item xs={12}>
      <title>{`${title} - dictyBase`}</title>
      <meta name="description" content={`${description} at dictyBase`} />
      <Box pt="20px" pb="20px">
        <Typography variant="h1" sx={{ textAlign: "center" }}>
          {title}
        </Typography>
      </Box>
      <AppBar component="div" position="static">
        <Tabs value={tabValue} variant="scrollable">
          <Link to={`/${gene}`}>
            <Tab sx={tabStyle} label="Gene Summary" />
          </Link>
          <Link to={`/${gene}/goannotations`}>
            <Tab sx={tabStyle} label="Gene Ontology" />
          </Link>
          <Link to={`/${gene}/phenotypes`}>
            <Tab sx={tabStyle} label="Phenotypes" />
          </Link>
          <Link to={`/${gene}/references`}>
            <Tab sx={tabStyle} label="References" />
          </Link>
        </Tabs>
      </AppBar>
      {children}
    </Grid>
  </Grid>
)

export { TabValues, Layout }
