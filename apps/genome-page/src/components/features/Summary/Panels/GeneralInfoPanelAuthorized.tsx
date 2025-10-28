import { ReactChild } from "react"
import { Box } from "@material-ui/core"
import { GeneGeneralInformationSummaryQuery } from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import { map as Amap, compact as Acompact, match as Amatch } from "fp-ts/Array"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { LeftDisplay } from "components/panels/LeftDisplay"
import { ItemDisplay } from "components/panels/ItemDisplay"
import { RightDisplay } from "components/panels/RightDisplay"
import { AuthorizedInfoText } from "components/panels/AuthorizedInfoText"
import { EditableContentList } from "components/panels/EditableContentList"
import { AuthorizedEmptyInfoList } from "components/panels/AuthorizedEmptyInfoList"

type Properties = {
  generalInformation: NonNullable<
    GeneGeneralInformationSummaryQuery["geneGeneralInformation"]
  >
}
type PanelRowData = {
  id: ReactChild
  value: ReactChild
}

/**
 * Panel to display Product Info on the Gene Summary page.
 */
const GeneralInfoPanelAuthorized = ({ generalInformation }: Properties) =>
  pipe(
    generalInformation,
    (info): Array<PanelRowData> => [
      {
        id: "Name Description",
        value: pipe(
          info.name_description,
          Amap(OfromNullable),
          Acompact,
          Amatch(
            () => (
              <AuthorizedEmptyInfoList
                id={info.id}
                field="name_description"
                label="Name Description"
              />
            ),
            (contentList) => (
              <EditableContentList
                id={info.id}
                field="name_description"
                label="Name Description"
                infoList={contentList}
              />
            ),
          ),
        ),
      },
      { id: "dictyBase ID", value: <>{info.id}</> },
      {
        id: "Gene Products",
        value: pipe(
          info.gene_product,
          OfromNullable,
          OgetOrElse(() => ""),
          (geneProducts) => <>{geneProducts}</>,
        ),
      },
      {
        id: "Alternative Gene Names",
        value: pipe(
          info.synonyms,
          Amap(OfromNullable),
          Acompact,
          Amatch(
            () => (
              <AuthorizedEmptyInfoList
                id={info.id}
                field="synonyms"
                label="Alternative Gene Name"
              />
            ),
            (contentList) => (
              <EditableContentList
                id={info.id}
                field="synonyms"
                label="Alternative Gene Name"
                infoList={contentList}
              />
            ),
          ),
        ),
      },
      {
        id: "Description",
        value: pipe(
          info.description,
          OfromNullable,
          OgetOrElse(() => ""),
          (description) => (
            <AuthorizedInfoText id={info.id} text={description} />
          ),
        ),
      },
    ],
    Amap(({ id, value }) => (
      <ItemDisplay key={id}>
        <LeftDisplay>{id}</LeftDisplay>
        <RightDisplay>{value}</RightDisplay>
      </ItemDisplay>
    )),
    (children) => <Box>{children}</Box>,
  )

export { GeneralInfoPanelAuthorized }
