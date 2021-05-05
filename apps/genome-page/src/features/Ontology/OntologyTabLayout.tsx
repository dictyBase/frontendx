import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import InnerGoPanel from "features/Ontology/InnerGoPanel"
import { GoAnnotation } from "dicty-graphql-schema"

const muiTheme = createMuiTheme({
  overrides: {
    MuiTab: {
      root: {
        textTransform: "none",
      },
      // selected: {
      //   backgroundColor: "#f2f1ef",
      // },
    },
    MuiTabs: {
      root: {
        backgroundColor: "#e6f2ff",
        color: "#000",
      },
      indicator: {
        backgroundColor: "#858780",
        height: "3px",
      },
    },
  },
})

type Props = {
  /** Gene data from GraphQL query */
  data: GoAnnotation[]
}

/**
 * Wrapper component that generates the inner tabs and their
 * corresponding layouts on the GO annotations page.
 */

const OntologyTabLayout = ({ data }: Props) => {
  const [tabValue, setTabValue] = React.useState(0)

  // set variables for filtered arrays based on evidence code
  const experimental = data.filter(
    (item: GoAnnotation) =>
      item.evidence_code === "IMP" ||
      item.evidence_code === "IGI" ||
      item.evidence_code === "IDA" ||
      item.evidence_code === "IPI" ||
      item.evidence_code === "IEP" ||
      item.evidence_code === "EXP",
  )
  const manual = data.filter(
    (item: GoAnnotation) => item.evidence_code !== "IEA",
  )
  const electronic = data.filter(
    (item: GoAnnotation) => item.evidence_code === "IEA",
  )

  const handleChange = (event: React.ChangeEvent<{}>, value: number) => {
    setTabValue(value)
  }

  return (
    <MuiThemeProvider theme={muiTheme}>
      <AppBar position="static">
        <Tabs value={tabValue} onChange={handleChange}>
          <Tab value={0} label="All GO" />
          {experimental.length > 0 && <Tab value={1} label="Experimental GO" />}
          {manual.length > 0 && <Tab value={2} label="Manual GO" />}
          {electronic.length > 0 && <Tab value={3} label="Electronic GO" />}
        </Tabs>
      </AppBar>
      <Typography component="div">
        {tabValue === 0 && <InnerGoPanel data={data} />}
        {tabValue === 1 && <InnerGoPanel data={experimental} />}
        {tabValue === 2 && <InnerGoPanel data={manual} />}
        {tabValue === 3 && <InnerGoPanel data={electronic} />}
      </Typography>
    </MuiThemeProvider>
  )
}

export default OntologyTabLayout
