import React from "react"
import AllGO from "./AllGO"
import ExperimentalGO from "./ExperimentalGO"
import ManualGO from "./ManualGO"
import ElectronicGO from "./ElectronicGO"
import TabBarContainer from "common/components/tabs/TabBarContainer"
import { Flex } from "rebass"
import { ThemeProvider } from "styled-components"

const theme = {
  primary: "#15317e",
  secondary: "#A3BAE9",
  tabText: "white"
}

const tabs = [
  { name: "All GO", label: "All GO", component: AllGO },
  {
    name: "Experimental GO",
    label: "Experimental GO",
    component: ExperimentalGO
  },
  { name: "Manual GO", label: "Manual GO", component: ManualGO },
  { name: "Electronic GO", label: "Electronic GO", component: ElectronicGO }
]

/**
 * Container for the Gene Ontology tab
 */

const GeneOntology = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Flex justify="center" mx="auto">
          <TabBarContainer tabs={tabs} />
        </Flex>
      </ThemeProvider>
      <br />
    </div>
  )
}

export default GeneOntology
