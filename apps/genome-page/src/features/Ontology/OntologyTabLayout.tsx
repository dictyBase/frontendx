import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles"
import InnerGoPanel from "features/Ontology/InnerGoPanel"
import { GoAnnotation, GeneQuery } from "dicty-graphql-schema"
import OtherError from "components/errors/OtherError"

const muiTheme = createTheme({
  overrides: {
    MuiTab: {
      root: {
        textTransform: "none",
      },
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
  data: GeneQuery
}

/**
 * Wrapper component that generates the inner tabs and their
 * corresponding layouts on the GO annotations page.
 */
const OntologyTabLayout = ({ data }: Props) => {
  const [tabValue, setTabValue] = React.useState(0)

  if (!data.gene || !data.gene.goas) return <OtherError />
  const goas = data.gene.goas

  // set variables for filtered arrays based on evidence code
  const experimental = goas.filter(
    (item: GoAnnotation) =>
      item.evidence_code === "IMP" ||
      item.evidence_code === "IGI" ||
      item.evidence_code === "IDA" ||
      item.evidence_code === "IPI" ||
      item.evidence_code === "IEP" ||
      item.evidence_code === "EXP",
  )
  const manual = goas.filter(
    (item: GoAnnotation) => item.evidence_code !== "IEA",
  )
  const electronic = goas.filter(
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
        {tabValue === 0 && <InnerGoPanel data={goas} />}
        {tabValue === 1 && <InnerGoPanel data={experimental} />}
        {tabValue === 2 && <InnerGoPanel data={manual} />}
        {tabValue === 3 && <InnerGoPanel data={electronic} />}
      </Typography>
    </MuiThemeProvider>
  )
}

export default OntologyTabLayout
