import React from "react"
import Link from "next/link"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import { Grid, AppBar, Box } from "@mui/material"
import Head from "next/head"

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
        <Head>
          <title>{title} - dictyBase</title>
          <meta name="description" content={`${description} at dictyBase`} />
        </Head>
        <Box pt="20px" pb="20px">
          <Typography variant="h1" className={classes.title}>
            {title}
          </Typography>
        </Box>
        <AppBar position="static">
          <Tabs value={tabValue} variant="scrollable">
            <Link href={`/${gene}`} passHref>
              <Tab label="Gene Summary" />
            </Link>
            {/* <Link href={`/gene/${gene}/proteininformation`} passHref>
              <Tab label="Protein Information" />
            </Link>
            */}
            <Link href={`/${gene}/goannotations`} passHref>
              <Tab label="Gene Ontology" />
            </Link>
            {/* <Link href={`/gene/${gene}/orthologs`} passHref>
              <Tab label="Orthologs" />
            </Link>
            */}
            <Link href={`/${gene}/phenotypes`} passHref>
              <Tab label="Phenotypes" />
            </Link>
            <Link href={`/${gene}/references`} passHref>
              <Tab label="References" />
            </Link>
            {/* <Link href={`/gene/${gene}/communityannotations`} passHref>
              <Tab label="Annotations" />
            </Link>
            */}
            {/* <Link href={`/gene/${gene}/blast`} passHref>
              <Tab label="BLAST" />
            </Link>
            */}
          </Tabs>
        </AppBar>
        {children}
      </Grid>
    </Grid>
  )
}

export { TabValues, Layout }
