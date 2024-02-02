import { pipe } from "fp-ts/function"
import { map as Amap, last, compact } from "fp-ts/Array"
import { bindTo, let as Ilet } from "fp-ts/Identity"
import { slice, trimRight } from "fp-ts/string"
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

// add check for already ending in punctation
const formatTitle = (title: string) =>
  pipe(
    title,
    bindTo("initial"),
    Ilet("full", ({ initial }) => removeTags(initial)),
    Ilet("shortened", ({ full }) => pipe(full, slice(0, 90), trimRight)),
    Ilet("withEllipses", ({ shortened, full }) =>
      shortened === full ? `${shortened}.` : `${shortened}...`,
    ),
  )

const createCitation = ({
  authors,
  publishDate,
  title,
  journal,
}: PublicationItem) =>
  `${getAuthorsString(authors)}. (${getPublicationYear(
    publishDate,
  )}). "${limitCharacters(removeTags(title), 90)}." ${journal}`

export {
  createCitation,
  getAuthorsString,
  removeTags,
  getPublicationYear,
  limitCharacters,
  formatTitle,
}
