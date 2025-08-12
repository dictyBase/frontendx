import React from "react"
import { match } from "ts-pattern"
import { pipe } from "fp-ts/function"
import { filter as Afilter, exists as Aexists } from "fp-ts/Array"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles"
import { GoAnnotation } from "dicty-graphql-schema"
import { InnerGoPanel } from "./InnerGoPanel"
import {
  isAny,
  isExperimental,
  isManual,
  isElectronic,
} from "./utils/predicates"
import { renderOnTrue } from "./utils/renderOnTrue"

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

type Properties = {
  /** Gene data from GraphQL query */
  goas: Array<GoAnnotation>
}

enum TabValues {
  ALL,
  EXPERIMENTAL,
  MANUAL,
  ELECTRONIC,
}

/**
 * Wrapper component that generates the inner tabs and their
 * corresponding layouts on the GO annotations page.
 */
const OntologyTabLayout = ({ goas }: Properties) => {
  const [tabValue, setTabValue] = React.useState<TabValues>(TabValues.ALL)
  // set variables for filtered arrays based on evidence code
  const predicate = match(tabValue)
    .with(TabValues.EXPERIMENTAL, () => isExperimental)
    .with(TabValues.MANUAL, () => isManual)
    .with(TabValues.ELECTRONIC, () => isElectronic)
    .otherwise(() => isAny)

  const filteredGoas = pipe(goas, Afilter(predicate))

  const handleChange = (_: React.ChangeEvent<{}>, value: number) => {
    setTabValue(value)
  }

  return (
    <MuiThemeProvider theme={muiTheme}>
      <AppBar position="static">
        <Tabs value={tabValue} onChange={handleChange}>
          <Tab value={TabValues.ALL} label="All GO" />
          {pipe(
            goas,
            Aexists(isExperimental),
            renderOnTrue(
              <Tab value={TabValues.EXPERIMENTAL} label="Experimental GO" />,
            ),
          )}
          {pipe(
            goas,
            Aexists(isManual),
            renderOnTrue(<Tab value={TabValues.MANUAL} label="Manual GO" />),
          )}
          {pipe(
            goas,
            Aexists(isElectronic),
            renderOnTrue(
              <Tab value={TabValues.ELECTRONIC} label="Electronic GO" />,
            ),
          )}
        </Tabs>
      </AppBar>
      <Typography component="div">
        <InnerGoPanel data={filteredGoas} />
      </Typography>
    </MuiThemeProvider>
  )
}

export { OntologyTabLayout }
