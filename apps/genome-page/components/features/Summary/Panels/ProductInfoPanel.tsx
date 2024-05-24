import { GeneSummaryQuery } from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import { map as Amap, head as Ahead } from "fp-ts/Array"
import {
  bind as Obind,
  bindTo as ObindTo,
  let as Olet,
  map as Omap,
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { OtherError } from "components/errors/OtherError"
import { LeftDisplay } from "components/panels/LeftDisplay"
import { ItemDisplay } from "components/panels/ItemDisplay"
import { RightDisplay } from "components/panels/RightDisplay"
import { ContentId, returnPanelContentById } from "common/utils/panelGenerator"

type Properties = {
  /** Array of GO annotations for a particular gene */
  geneProductInformation: GeneSummaryQuery["listGeneProductInformation"]
}

/**
 * Panel to display Product Info on the Gene Summary page.
 */
const ProductInfoPanel = ({ geneProductInformation }: Properties) =>
  pipe(
    geneProductInformation,
    OfromNullable,
    ObindTo("geneProduct"),
    Obind("firstGeneProduct", ({ geneProduct }) => Ahead(geneProduct)),
    Olet(
      "displayItems",
      ({ firstGeneProduct }): Array<{ id: ContentId; value: any }> => [
        {
          id: "Protein Coding Gene",
          value: firstGeneProduct.protein_coding_gene,
        },
        { id: "Protein Length", value: firstGeneProduct.protein_length },
        {
          id: "Molecular Weight",
          value: firstGeneProduct.protein_molecular_weight,
        },
        { id: "More Protein Data", value: firstGeneProduct.more_protein_data },
        { id: "Genomic Coords.", value: firstGeneProduct.genomic_coords },
      ],
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

export { ProductInfoPanel }
