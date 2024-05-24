import React from "react"
import { GeneSummaryQuery } from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { ContentId, returnPanelContentById } from "common/utils/panelGenerator"
import { OtherError } from "components/errors/OtherError"
import { LeftDisplay } from "components/panels/LeftDisplay"
import { ItemDisplay } from "components/panels/ItemDisplay"
import { RightDisplay } from "components/panels/RightDisplay"

type Properties = {
  generalInformation: GeneSummaryQuery["geneGeneralInformation"]
}

type PanelRowData = { id: ContentId; value: string[] | string }

/**
 * Panel to display Product Info on the Gene Summary page.
 */
const GeneralInfoPanel = ({ generalInformation }: Properties) => {
  if (!generalInformation) return <OtherError />
  const {
    id: gene_id,
    name_description,
    alt_gene_name,
    gene_product,
    alt_protein_names,
    description,
  } = generalInformation
  return (
    <div>
      {pipe(
        [
          { id: "Name Description", value: name_description },
          { id: "Alternative Gene Names", value: alt_gene_name },
          { id: "dictyBase ID", value: gene_id },
          { id: "Gene Product", value: gene_product },
          {
            id: "Alternative Protein Names",
            value: alt_protein_names,
          },
          { id: "Description", value: description },
        ] as Array<PanelRowData>,
        Amap(({ id, value }) => ({
          id,
          value: returnPanelContentById(id, value),
        })),
        Amap((item) => (
          <ItemDisplay key={item.id}>
            <LeftDisplay>{item.id}</LeftDisplay>
            <RightDisplay>{item.value}</RightDisplay>
          </ItemDisplay>
        )),
      )}
    </div>
  )
}

export { GeneralInfoPanel }
