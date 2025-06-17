import { pipe } from "fp-ts/function"
import { map as Amap, match as Amatch } from "fp-ts/Array"
import { ItemDisplay } from "components/panels/ItemDisplay"
import { LeftDisplay } from "components/panels/LeftDisplay"
import { RightDisplay } from "components/panels/RightDisplay"
import { GeneOntologyAnnotationSummaryQuery } from "dicty-graphql-schema"
import { GoaPanelContent } from "./GoaPanelContent"

type GOType = "molecular_function" | "biological_process" | "cellular_component"

const dataFilter =
  (type: GOType) =>
  (
    array: NonNullable<
      GeneOntologyAnnotationSummaryQuery["geneOntologyAnnotation"]
    >,
  ) => {
    // get the attributes from specified type
    const attribute = array.filter((item) => item.type === type)

    // get the five most recent EXP annotations
    const expChecker = attribute
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
    const manualChecker = attribute
      .filter((item) => item.evidence_code !== "IEA")
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 5)

    // get five most recent electronic
    const electronicChecker = attribute
      .filter((item) => item.evidence_code === "IEA")
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 5)

    // check if EXP array is empty
    // if it is, return manual
    // if manual is empty, return electronic
    if (!Array.isArray(expChecker) || expChecker.length === 0) {
      if (!Array.isArray(manualChecker) || manualChecker.length === 0) {
        return electronicChecker
      }
      return manualChecker
    }
    return expChecker
  }

type Properties = {
  /** Array of GO annotations for a particular gene */
  goas: NonNullable<
    GeneOntologyAnnotationSummaryQuery["geneOntologyAnnotation"]
  >
}

/**
 * Panel to display Gene Ontology Annotations on the Gene Summary page.
 */
const GoaPanel = ({ goas }: Properties) => (
  <div>
    {pipe(
      goas,
      dataFilter("molecular_function"),
      Amap((item) => <GoaPanelContent key={item.id} goa={item} />),
      Amatch(
        () => <></>,
        (children) => (
          <ItemDisplay>
            <LeftDisplay>Molecular Function</LeftDisplay>
            <RightDisplay>{children}</RightDisplay>
          </ItemDisplay>
        ),
      ),
    )}
    {pipe(
      goas,
      dataFilter("biological_process"),
      Amap((item) => <GoaPanelContent key={item.id} goa={item} />),
      Amatch(
        () => <></>,
        (children) => (
          <ItemDisplay>
            <LeftDisplay>Biological Process</LeftDisplay>
            <RightDisplay>{children}</RightDisplay>
          </ItemDisplay>
        ),
      ),
    )}
    {pipe(
      goas,
      dataFilter("cellular_component"),
      Amap((item) => <GoaPanelContent key={item.id} goa={item} />),
      Amatch(
        () => <></>,
        (children) => (
          <ItemDisplay>
            <LeftDisplay>Cellular Component</LeftDisplay>
            <RightDisplay>{children}</RightDisplay>
          </ItemDisplay>
        ),
      ),
    )}
  </div>
)

export { GoaPanel }
