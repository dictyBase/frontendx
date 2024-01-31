import { pipe } from "fp-ts/function"
import { isSome } from "fp-ts/Option"
import { map as Amap, last, filter as Afilter } from "fp-ts/Array"
import { match } from "ts-pattern"
import { type PublicationItem } from "../hooks/useFetchPublications"

const getAuthorsString = (authors: Array<string>) =>
  pipe(
    authors,
    Amap((a) => a.split(" ")),
    Amap(last),
    Afilter(isSome),
    Amap(({ value }) => value),
    (a) =>
      match(a.length)
        .when(
          (l) => l === 1,
          () => a[0],
        )
        .when(
          (l) => l === 2,
          () => `${a[0]} & ${a[1]}`,
        )
        .when(
          (l) => l >= 3,
          () => `${a[0]} et al`,
        )
        .otherwise(() => `Unexpected Error`),
  )

const getPublicationYear = (publicationDate: string) =>
  new Date(publicationDate).getFullYear()

const createCitation = ({
  authors,
  publishDate,
  title,
  journal,
}: PublicationItem) =>
  `${getAuthorsString(authors)}. (${getPublicationYear(
    publishDate,
  )}). ${title}. ${journal}`

export { createCitation }
