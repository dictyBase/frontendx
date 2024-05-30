import React from "react"
import { GeneSummaryQuery } from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import {
  bindTo as ObindTo,
  let as Olet,
  map as Omap,
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
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
const GeneralInfoPanel = ({ generalInformation }: Properties) =>
  pipe(
    generalInformation,
    OfromNullable,
    ObindTo("info"),
    Olet(
      "displayItems",
      ({ info }): Array<{ id: ContentId; value: any }> =>
        [
          { id: "Name Description", value: info.name_description },
          { id: "dictyBase ID", value: info.id },
          { id: "Gene Product", value: info.gene_product },
          {
            id: "Alternative Protein Names",
            value: info.synonyms,
          },
          { id: "Description", value: info.description },
        ] as Array<PanelRowData>,
    ),
    Olet("element", ({ displayItems }) =>
      pipe(
        displayItems,
        Amap(({ id, value }) => (
          <ItemDisplay key={id}>
            <LeftDisplay>{id}</LeftDisplay>
            <RightDisplay>{returnPanelContentById(id, value)}</RightDisplay>
          </ItemDisplay>
        )),
        (children) => <div>{children}</div>,
      ),
    ),
    Omap(({ element }) => element),
    OgetOrElse(() => <OtherError />),
  )

export { GeneralInfoPanel }
