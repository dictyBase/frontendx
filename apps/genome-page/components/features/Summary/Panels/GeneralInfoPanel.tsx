import React from "react"
import { GeneGeneralInformationSummaryQuery } from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import {
  map as Omap,
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { ContentId, returnPanelContentById } from "common/utils/panelGenerator"
import { LeftDisplay } from "components/panels/LeftDisplay"
import { ItemDisplay } from "components/panels/ItemDisplay"
import { RightDisplay } from "components/panels/RightDisplay"

type Properties = {
  generalInformation: GeneGeneralInformationSummaryQuery["geneGeneralInformation"]
}

type PanelRowData = { id: ContentId; value: string[] | string }

/**
 * Panel to display Product Info on the Gene Summary page.
 */
const GeneralInfoPanel = ({ generalInformation }: Properties) =>
  pipe(
    generalInformation,
    OfromNullable,
    Omap(
      (info) =>
        [
          {
            id: "Name Description",
            value: pipe(
              info.name_description,
              Amap(OfromNullable),
              Amap(OgetOrElse(() => "")),
            ),
          },
          { id: "dictyBase ID", value: info.id },
          {
            id: "Gene Product",
            value: pipe(
              info.gene_product,
              OfromNullable,
              OgetOrElse(() => ""),
            ),
          },
          {
            id: "Alternative Protein Names",
            value: pipe(
              info.synonyms,
              Amap(OfromNullable),
              Amap(OgetOrElse(() => "")),
            ),
          },
          {
            id: "Description",
            value: pipe(
              info.description,
              OfromNullable,
              OgetOrElse(() => ""),
            ),
          },
        ] as Array<PanelRowData>,
    ),
    Omap(
      Amap(({ id, value }) => (
        <ItemDisplay key={id}>
          <LeftDisplay>{id}</LeftDisplay>
          <RightDisplay>{returnPanelContentById(id, value)}</RightDisplay>
        </ItemDisplay>
      )),
    ),
    Omap((children) => <div>{children}</div>),
    OgetOrElse(() => <></>),
  )

export { GeneralInfoPanel }
