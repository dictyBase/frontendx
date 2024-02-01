import { pipe } from "fp-ts/function"
import { map as Amap, last, compact } from "fp-ts/Array"
import { match } from "ts-pattern"
import { type PublicationItem } from "../hooks/useFetchPublications"

const getAuthorsString = (authors: Array<string>) =>
  pipe(
    authors,
    Amap((a) => a.split(" ")),
    Amap(last),
    compact,
    (lastNames) =>
      match(lastNames.length)
        .when(
          (l) => l === 1,
          () => lastNames[0],
        )
        .when(
          (l) => l === 2,
          () => `${lastNames[0]} & ${lastNames[1]}`,
        )
        .when(
          (l) => l >= 3,
          () => `${lastNames[0]} et al`,
        )
        .otherwise(() => `Unexpected Error`),
  )

const removeTags = (string: string) => string.replaceAll(/<\/?\w+>/g, "")

const getPublicationYear = (publicationDate: string) =>
  new Date(publicationDate).getFullYear()

const limitCharacters = (text: string, limit: number) =>
  text.length > limit ? `${text.slice(0, limit).trimEnd()}..` : text

const createCitation = ({
  authors,
  publishDate,
  title,
  journal,
}: PublicationItem) =>
  `${getAuthorsString(authors)}. (${getPublicationYear(
    publishDate,
  )}). "${limitCharacters(removeTags(title), 100)}." ${journal}`

export {
  createCitation,
  getAuthorsString,
  removeTags,
  getPublicationYear,
  limitCharacters,
}
