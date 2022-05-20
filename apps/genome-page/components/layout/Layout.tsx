import React from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { Typography, Grid, AppBar, Box } from "@mui/material"
import Head from "next/head"

const getTabValue = (pathname: string) => {
  const subroute = pathname.split("/").splice(-1).join()

  switch (subroute) {
    case "communityannotations":
      return 6
    case "references":
      return 5
    case "phenotypes":
      return 4
    case "orthologs":
      return 3
    case "goannotations":
      return 2
    case "proteininformation":
      return 1
    default:
      return 0
  }
}

type Props = {
  children: React.ReactNode
  gene: string
  title: string
  description: string
}

const Layout = ({ children, gene, title, description }: Props) => {
  const router = useRouter()
  const [tabValue, setTabValue] = React.useState(getTabValue(router.pathname))

  const handleChange = (event: React.ChangeEvent<{}>, value: number) => {
    setTabValue(value)
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Head>
          <title>{title} - dictyBase</title>
          <meta name="description" content={`${description} at dictyBase`} />
        </Head>
        <Box pt="20px" pb="20px">
          <Typography textAlign="center" variant="h1" fontSize="24px">
            {title}
          </Typography>
        </Box>
        <AppBar position="static">
          <Tabs value={tabValue} onChange={handleChange}>
            <Link href={`/gene/${gene}`} passHref>
              <Tab label="Gene Summary" />
            </Link>
            <Link href={`/gene/${gene}/proteininformation`} passHref>
              <Tab label="Protein Information" />
            </Link>
            <Link href={`/gene/${gene}/goannotations`} passHref>
              <Tab label="Gene Ontology" />
            </Link>
            <Link href={`/gene/${gene}/orthologs`} passHref>
              <Tab label="Orthologs" />
            </Link>
            <Link href={`/gene/${gene}/phenotypes`} passHref>
              <Tab label="Phenotypes" />
            </Link>
            <Link href={`/gene/${gene}/references`} passHref>
              <Tab label="References" />
            </Link>
            <Link href={`/gene/${gene}/communityannotations`} passHref>
              <Tab label="Annotations" />
            </Link>
          </Tabs>
        </AppBar>
        {children}
      </Grid>
    </Grid>
  )
}

export { getTabValue }
export default Layout
