import { ReactChild } from "react"
import { Box } from "@material-ui/core"
import { GeneGeneralInformationSummaryQuery } from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import { sequence } from "fp-ts/Record"
import { map as Amap, compact as Acompact, isNonEmpty } from "fp-ts/Array"
import {
  Applicative as OApplicative,
  Option,
  some,
  fromPredicate as OfromPredicate,
  fromNullable as OfromNullable,
  map as Omap,
} from "fp-ts/Option"
import { LeftDisplay } from "components/panels/LeftDisplay"
import { ItemDisplay } from "components/panels/ItemDisplay"
import { RightDisplay } from "components/panels/RightDisplay"
import { ReadonlyContentList } from "components/ReadonlyContentList"

type Properties = {
  generalInformation: NonNullable<
    GeneGeneralInformationSummaryQuery["geneGeneralInformation"]
  >
}
type PanelRowData = {
  id: Option<ReactChild>
  value: Option<ReactChild>
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
          Omap((description) => (
            <ReadonlyContentList contentList={description} />
          )),
        ),
      },
      { id: some("dictyBase ID"), value: some(<>{info.id}</>) },
      {
        id: some("Gene Products"),
        value: pipe(
          info.gene_product,
          OfromNullable,
          Omap((geneProducts) => <>{geneProducts}</>),
        ),
      },
      {
        id: some("Alternative Gene Names"),
        value: pipe(
          info.synonyms,
          Amap(OfromNullable),
          Acompact,
          OfromPredicate(isNonEmpty),
          Omap((names) => <ReadonlyContentList contentList={names} />),
        ),
      },
      {
        id: some("Description"),
        value: pipe(
          info.description,
          OfromNullable,
          Omap((description) => <>{description}</>),
        ),
      },
    ],
    Amap(sequence(OApplicative)),
    Acompact,
    Amap(({ id, value }) => (
      <ItemDisplay key={id}>
        <LeftDisplay>{id}</LeftDisplay>
        <RightDisplay>{value}</RightDisplay>
      </ItemDisplay>
    )),
    (children) => <Box>{children}</Box>,
  )

export { GeneralInfoPanel }
