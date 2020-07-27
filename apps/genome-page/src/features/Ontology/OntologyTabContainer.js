import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import InnerGoPanel from "features/Ontology/InnerGoPanel"

const muiTheme = createMuiTheme({
  overrides: {
    MuiTab: {
      root: {
        textTransform: "none",
      },
      // leaving this as an example of how to change selected tab properties
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

/**
 * TODO:
 * 1. Add tab logic
 * 2. Clean up tab code
 */

const OntologyTabContainer = ({ data }) => {
  // set variables for filtered arrays based on evidence code
  const experimental = data.filter(
    (code) =>
      code.evidence_code === "IMP" ||
      code.evidence_code === "IGI" ||
      code.evidence_code === "IDA" ||
      code.evidence_code === "IPI" ||
      code.evidence_code === "IEP" ||
      code.evidence_code === "EXP",
  )
  const manual = data.filter((code) => code.evidence_code !== "IEA")
  const electronic = data.filter((code) => code.evidence_code === "IEA")

  return (
    <MuiThemeProvider theme={muiTheme}>
      <AppBar position="static">
        <Tabs value="all" onChange={() => console.log("changed")}>
          <Tab value="all" label="All GO" />
          {experimental.length > 0 && (
            <Tab value="experimental" label="Experimental GO" />
          )}
          {manual.length > 0 && <Tab value="manual" label="Manual GO" />}
          {electronic.length > 0 && (
            <Tab value="electronic" label="Electronic GO" />
          )}
        </Tabs>
      </AppBar>
      <Typography component="div">
        <InnerGoPanel data={data} />
      </Typography>
      {/* {goa.currentTab === "experimental" && (
          <TypographyWrapper>
            <InnerGoPanel goaData={experimental} />
          </TypographyWrapper>
        )}
        {goa.currentTab === "manual" && (
          <TypographyWrapper>
            <InnerGoPanel goaData={manual} />
          </TypographyWrapper>
        )}
        {goa.currentTab === "electronic" && (
          <TypographyWrapper>
            <InnerGoPanel goaData={electronic} />
          </TypographyWrapper>
        )} */}
    </MuiThemeProvider>
  )
}

export default OntologyTabContainer
