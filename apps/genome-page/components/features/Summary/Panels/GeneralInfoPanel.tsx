import React from "react"
import { GeneSummaryQuery } from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import { Monoid as SMonoid } from "fp-ts/string"
import { Ord as NOrd } from "fp-ts/number"
import { Refinement } from "fp-ts/Refinement"
import { Ord, contramap } from "fp-ts/Ord"
import { map as Smap, mapLeft as SmapLeft } from "fp-ts/Separated"
import {
  sort as Asort,
  map as Amap,
  filter as Afilter,
  isNonEmpty as AisNonEmpty,
  partition as Apartition,
  intercalate as Aintercalate,
} from "fp-ts/Array"
import { isSome, fromNullable as OfromNullable } from "fp-ts/Option"
import { ContentId, returnPanelContentById } from "common/utils/panelGenerator"
import { OtherError } from "components/errors/OtherError"
import { LeftDisplay } from "components/panels/LeftDisplay"
import { ItemDisplay } from "components/panels/ItemDisplay"
import { RightDisplay } from "components/panels/RightDisplay"

type Properties = {
  generalInformation: GeneSummaryQuery["geneGeneralInformation"]
}
type PanelRowData = { order: number; id: ContentId; value: string[] | string }
type PanelRowStringData = { order: number; id: ContentId; value: string }
type PanelRowArrayData = { order: number; id: ContentId; value: string[] }

const arrayFieldRefinement: Refinement<PanelRowData, PanelRowArrayData> = (
  rowData,
): rowData is PanelRowArrayData => Array.isArray(rowData.value)

const stringFieldRefinement: Refinement<PanelRowData, PanelRowStringData> = (
  rowData,
): rowData is PanelRowStringData => typeof rowData.value === "string"

const formatArrayData = (row: PanelRowArrayData): PanelRowStringData => ({
  ...row,
  value: Aintercalate(SMonoid)(", ")(row.value),
})
const panelDataOrd: Ord<PanelRowStringData> = pipe(
  NOrd,
  contramap(({ order }) => order),
)
/**
 * Panel to display Product Info on the Gene Summary page.
 */
const GeneralInfoPanel = ({ generalInformation }: Properties) => {
  if (!generalInformation) return <OtherError />
  console.log(generalInformation.id)
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
          { order: 0, id: "Name Description", value: name_description },
          { order: 1, id: "Alternative Gene Names", value: alt_gene_name },
          { order: 2, id: "dictyBase ID", value: gene_id },
          { order: 3, id: "Gene Product", value: gene_product },
          {
            order: 4,
            id: "Alternative Protein Names",
            value: alt_protein_names,
          },
          { order: 5, id: "Description", value: description },
        ] as Array<PanelRowData>,
        Amap(({ id, value }) => ({
          id,
          value: returnPanelContentById(id, value),
        })),
        // Separate items by the type of their `value` properties: left: string, right: Array<string>
        // Apartition(arrayFieldRefinement),
        // Filter out right items where `value` is an empty array
        // Smap(Afilter(({ value }) => pipe(value, AisNonEmpty))),
        // Convert the right `value`s from Array<string> to a comma separated string
        // Smap(Amap(formatArrayData)),
        /* Refine type of left `value`s from Array<string> | string to string.
         * This is necessarily only for type casting, since all left values are expected to
         * be strings already due to the partition */
        // SmapLeft(Afilter(stringFieldRefinement)),
        // Rejoin separated arrays
        // ({ left, right }) => [...left, ...right],
        // Re-sort items by order number
        // Asort(panelDataOrd),
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
