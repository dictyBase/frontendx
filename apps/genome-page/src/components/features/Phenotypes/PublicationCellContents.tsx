import { ListStrainsWithGeneQuery } from "dicty-graphql-schema"
import { commaSeparateWithAnd } from "common/utils/strings"

type PublicationCellContentsProperties = {
  publication: NonNullable<
    NonNullable<
      NonNullable<
        ListStrainsWithGeneQuery["listStrainsWithGene"]
      >[0]["phenotypes"]
    >[0]["publication"]
  >
}

const PublicationCellContents = ({
  publication,
}: PublicationCellContentsProperties) => {
  const { authors, title, journal, pages } = publication
  const authorLastNames = authors.map((a) => a.last_name)
  return (
    <>
      <b>{commaSeparateWithAnd(authorLastNames)}</b> &nbsp;
      <span>&apos;{title}&apos;</span> &nbsp;
      <i>{journal}</i> &nbsp; <span>{pages}</span>{" "}
    </>
  )
}

export { PublicationCellContents }
