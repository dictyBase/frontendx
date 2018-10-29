// @flow
import React from "react"
import TableRow from "@material-ui/core/TableRow"

import GoaPanelContent from "./GoaPanelContent"
import TableWrapper from "common/components/TableWrapper"
import PanelListItemLeft from "common/components/panels/PanelListItemLeft"
import PanelListItemRight from "common/components/panels/PanelListItemRight"

// function that takes in the data array and the type (i.e. "molecular_function") to filter by
const dataFilter = (arr, type) => {
  // get the attributes from specified type
  const attr = arr
    .filter(item => item.type === type)
    .map(item => item.attributes)

  // get the five most recent EXP annotations
  const expChecker = attr
    .filter(
      item =>
        item.evidence_code === "IMP" ||
        item.evidence_code === "IGI" ||
        item.evidence_code === "IDA" ||
        item.evidence_code === "IPI" ||
        item.evidence_code === "IEP" ||
        item.evidence_code === "EXP",
    )
    .sort((a, b) => b.date - a.date)
    .slice(0, 5)

  // get five most recent manual
  const manualChecker = attr
    .filter(item => item.evidence_code !== "IEA")
    .sort((a, b) => b.date - a.date)
    .slice(0, 5)

  // get five most recent electronic
  const electronicChecker = attr
    .filter(item => item.evidence_code === "IEA")
    .sort((a, b) => b.date - a.date)
    .slice(0, 5)

  // check if EXP array is empty
  // if it is, return manual
  // if manual is empty, return electronic
  if (!Array.isArray(expChecker) || !expChecker.length) {
    if (!Array.isArray(manualChecker) || !manualChecker.length) {
      return electronicChecker
    }
    return manualChecker
  }
  return expChecker
}

type dataProps = {
  assigned_by: string,
  date: string,
  evidence_code: string,
  extensions: Array<Object>,
  goterm: string,
  publication: string,
  qualifier: string,
  with: Array<Object>,
}

type Props = {
  /** Material-UI styling */
  classes: Object,
  /** Object representing the "goa" slice of state */
  panelData: Object,
}

/**
 * Panel to display Gene Ontology Annotations in Gene Summary tab
 */

const GoaPanel = (props: Props) => {
  const { panelData } = props

  return (
    <TableWrapper>
      <TableRow>
        <PanelListItemLeft title="Molecular Function" />
        <PanelListItemRight>
          {dataFilter(panelData.data, "molecular_function").map(
            (item: dataProps, i: string) => (
              <GoaPanelContent key={i} item={item} />
            ),
          )}
        </PanelListItemRight>
      </TableRow>
      <TableRow>
        <PanelListItemLeft title="Biological Process" />
        <PanelListItemRight>
          {dataFilter(panelData.data, "biological_process").map(
            (item: dataProps, i: string) => (
              <GoaPanelContent key={i} item={item} />
            ),
          )}
        </PanelListItemRight>
      </TableRow>
      <TableRow>
        <PanelListItemLeft title="Cellular Component" />
        <PanelListItemRight>
          {dataFilter(panelData.data, "cellular_component").map(
            (item: dataProps, i: string) => (
              <GoaPanelContent key={i} item={item} />
            ),
          )}
        </PanelListItemRight>
      </TableRow>
    </TableWrapper>
  )
}

export default GoaPanel
