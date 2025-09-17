import React from "react"
import { Link } from "react-router-dom"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import { Grid, AppBar, Box } from "@mui/material"
import { Helmet } from "react-helmet"

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
const useStyles = makeStyles({
  title: {
    textAlign: "center",
  },
})

const Layout = ({
  tabValue,
  children,
  gene,
  title,
  description,
}: Properties) => {
  const classes = useStyles()

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Helmet>
          <title>{title} - dictyBase</title>
          <meta name="description" content={`${description} at dictyBase`} />
        </Helmet>
        <Box pt="20px" pb="20px">
          <Typography variant="h1" className={classes.title}>
            {title}
          </Typography>
        </Box>
        <AppBar position="static">
          <Tabs value={tabValue} variant="scrollable">
            <Link to={`/${gene}`}>
              <Tab label="Gene Summary" />
            </Link>
            <Link to={`/${gene}/goannotations`}>
              <Tab label="Gene Ontology" />
            </Link>
            <Link to={`/${gene}/phenotypes`}>
              <Tab label="Phenotypes" />
            </Link>
            <Link to={`/${gene}/references`}>
              <Tab label="References" />
            </Link>
          </Tabs>
        </AppBar>
        {children}
      </Grid>
    </Grid>
  )
}

export { TabValues, Layout }
