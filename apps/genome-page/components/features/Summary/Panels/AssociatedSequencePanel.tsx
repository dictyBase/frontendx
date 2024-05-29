import React from "react"
import { pipe } from "fp-ts/function"
import {
  bindTo as ObindTo,
  fromNullable as OfromNullable,
  let as Olet,
  map as Omap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { map as Amap } from "fp-ts/Array"
import { ItemDisplay } from "components/panels/ItemDisplay"
import { LeftDisplay } from "components/panels/LeftDisplay"
import { RightDisplay } from "components/panels/RightDisplay"
import { GeneSummaryQuery } from "dicty-graphql-schema"
import { OtherError } from "components/errors/OtherError"
import { ContentId, returnPanelContentById } from "common/utils/panelGenerator"

type Properties = {
  /** Array of GO annotations for a particular gene */
  associatedSequences: GeneSummaryQuery["associatedSequences"]
}

/**
 * Panel to display Associated Sequence Panel on the Gene Summary page.
 */
const AssociatedSequencePanel = ({ associatedSequences }: Properties) => {
  console.log(associatedSequences)
  return pipe(
    associatedSequences,
    OfromNullable,
    ObindTo("assocSeq"),
    Olet("displayItems", ({ assocSeq }) => [
      {
        id: "GenBank Genomic Fragment" as ContentId,
        value: pipe(
          assocSeq.genbank_genomic_fragment,
          OfromNullable,
          OgetOrElse(() => ({ name: "", link: "" })),
        ),
      },
      {
        id: "GenBank mRNA" as ContentId,
        value: pipe(
          assocSeq.genbank_mrna,
          OfromNullable,
          OgetOrElse(() => ({ name: "", link: "" })),
        ),
      },
      { id: "ESTs" as ContentId, value: assocSeq.ests },
    ]),
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
}

export { AssociatedSequencePanel }
