import React from "react"
import GoaPanelContent from "./GoaPanelContent"
import ItemDisplay from "common/components/panels/ItemDisplay"
import LeftDisplay from "common/components/panels/LeftDisplay"
import RightDisplay from "common/components/panels/RightDisplay"
import { GoAnnotation } from "dicty-graphql-schema"

type GOType = "molecular_function" | "biological_process" | "cellular_component"

const dataFilter = (arr: Array<GoAnnotation>, type: GOType) => {
  // get the attributes from specified type
  const attr = arr.filter((item) => item.type === type)

  // get the five most recent EXP annotations
  const expChecker = attr
    .filter(
      (item) =>
        item.evidence_code === "IMP" ||
        item.evidence_code === "IGI" ||
        item.evidence_code === "IDA" ||
        item.evidence_code === "IPI" ||
        item.evidence_code === "IEP" ||
        item.evidence_code === "EXP",
    )
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5)

  // get five most recent manual
  const manualChecker = attr
    .filter((item) => item.evidence_code !== "IEA")
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5)

  // get five most recent electronic
  const electronicChecker = attr
    .filter((item) => item.evidence_code === "IEA")
    .sort((a, b) => b.date.localeCompare(a.date))
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

type Props = {
  /** Array of GO annotations for a particular gene */
  data: Array<GoAnnotation>
}

/**
 * Panel to display Gene Ontology Annotations on the Gene Summary page.
 */

const GoaPanel = ({ data }: Props) => (
  <div>
    <ItemDisplay>
      <LeftDisplay>Molecular Function</LeftDisplay>
      <RightDisplay>
        {dataFilter(data, "molecular_function").map(
          (item: GoAnnotation, index: number) => (
            <GoaPanelContent key={index} data={item} />
          ),
        )}
      </RightDisplay>
    </ItemDisplay>
    <ItemDisplay>
      <LeftDisplay>Biological Process</LeftDisplay>
      <RightDisplay>
        {dataFilter(data, "biological_process").map(
          (item: GoAnnotation, index: number) => (
            <GoaPanelContent key={index} data={item} />
          ),
        )}
      </RightDisplay>
    </ItemDisplay>
    <ItemDisplay>
      <LeftDisplay>Cellular Component</LeftDisplay>
      <RightDisplay>
        {dataFilter(data, "cellular_component").map(
          (item: GoAnnotation, index: number) => (
            <GoaPanelContent key={index} data={item} />
          ),
        )}
      </RightDisplay>
    </ItemDisplay>
  </div>
)

export default GoaPanel
