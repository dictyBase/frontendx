import React from "react"
import { Helmet } from "react-helmet"
import Grid from "@mui/material/Grid"
import AppBar from "@mui/material/AppBar"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import {
  Theme,
  ThemeProvider,
  ThemeOptions,
  createTheme,
} from "@mui/material/styles"
import { Organism } from "dicty-graphql-schema"
import { Citations } from "./Citations"
import { DownloadsTable } from "./DownloadsTable"
import { DownloadsHeader } from "./DownloadsHeader"

// create theme with our standard tab overrides
const downloadsComponentOverrides: ThemeOptions = {
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          minWidth: "160px",
          textTransform: "none",
          color: "#000",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: "#cce6ff",
          color: "#000",
        },
        indicator: {
          backgroundColor: "#80c1ff",
        },
      },
    },
  },
}

type Properties = {
  data: Organism[]
}

/**
 * This displays the Dicty downloads page.
 */

const generateTabs = (items: Array<Organism>) =>
  items.map((item: Organism) => (
    <Tab
      value={item.taxon_id}
      label={item.scientific_name}
      key={item.taxon_id}
    />
  ))

const DownloadsDisplay = ({ data }: Properties) => {
  const [tabValue, setTabValue] = React.useState(data[0]?.taxon_id)

  const handleChange = (_: React.ChangeEvent<{}>, value: string) => {
    setTabValue(value)
  }

  const generateTabContainers = (items: Array<Organism>) => {
    const filteredItems = items.filter((item) => item.taxon_id === tabValue)

    return filteredItems.map((item: Organism) => (
      <Typography component="div" key={item.taxon_id}>
        <Citations citations={item.citations} />
        <DownloadsTable data={item.downloads} />
      </Typography>
    ))
  }

  return (
    <ThemeProvider
      theme={(theme: Theme) =>
        createTheme({
          ...theme,
          components: {
            ...theme.components,
            ...downloadsComponentOverrides.components,
          },
        })
      }>
      <Helmet>
        <title>dictyBase Downloads</title>
        <meta
          name="description"
          content="dictyBase Downloads - the central collection of downloadable material from dictyBase"
        />
      </Helmet>
      <Grid container justifyContent="center">
        <Grid item xs={8}>
          <DownloadsHeader />
          <AppBar position="static">
            <Tabs
              value={tabValue}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto">
              {generateTabs(data)}
            </Tabs>
          </AppBar>
          {generateTabContainers(data)}
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export { DownloadsDisplay }
