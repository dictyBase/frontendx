import React from "react"
import { Box } from "@material-ui/core"
import { GeneGeneralInformationSummaryQuery } from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray"
import { sequence } from "fp-ts/Record"
import { map as Amap, compact as Acompact, isNonEmpty } from "fp-ts/Array"
import {
  Applicative as OApplicative,
  Option,
  some,
  fromPredicate as OfromPredicate,
  fromNullable as OfromNullable,
} from "fp-ts/Option"
import { ContentId, returnPanelContentById } from "common/utils/panelGenerator"
import { LeftDisplay } from "components/panels/LeftDisplay"
import { ItemDisplay } from "components/panels/ItemDisplay"
import { RightDisplay } from "components/panels/RightDisplay"

type Properties = {
  generalInformation: NonNullable<
    GeneGeneralInformationSummaryQuery["geneGeneralInformation"]
  >
}
type PanelRowData = {
  id: Option<ContentId>
  value: Option<NonEmptyArray<string> | string>
}

/**
 * Panel to display Product Info on the Gene Summary page.
 */
const GeneralInfoPanel = ({ generalInformation }: Properties) =>
  pipe(
    generalInformation,
    (info): Array<PanelRowData> => [
      {
        id: some("Name Description"),
        value: pipe(
          info.name_description,
          Amap(OfromNullable),
          Acompact,
          OfromPredicate(isNonEmpty),
        ),
      },
      { id: some("dictyBase ID"), value: some(info.id) },
      {
        id: some("Gene Products"),
        value: pipe(info.gene_product, OfromNullable),
      },
      {
        id: some("Alternative Gene Names"),
        value: pipe(
          info.synonyms,
          Amap(OfromNullable),
          Acompact,
          OfromPredicate(isNonEmpty),
        ),
      },
      {
        id: some("Description"),
        value: pipe(info.description, OfromNullable),
      },
    ],
    Amap(sequence(OApplicative)),
    Acompact,
    Amap(({ id, value }) => (
      <ItemDisplay key={id}>
        <LeftDisplay>{id}</LeftDisplay>
        <RightDisplay>
          {returnPanelContentById(id as ContentId, value)}
        </RightDisplay>
      </ItemDisplay>
    )),
    (children) => <Box>{children}</Box>,
  )

export { GeneralInfoPanel }
