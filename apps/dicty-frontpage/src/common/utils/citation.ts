import { pipe } from "fp-ts/function"
import { getOrElse as OgetOrElse } from "fp-ts/Option"
import {
  map as Amap,
  last,
  compact as Acompact,
  intersperse as Aintersperse,
  foldLeft as AfoldLeft,
  foldMap as AfoldMap,
  reduce as Areduce,
  splitAt as AsplitAt,
  updateAt as AupdateAt,
  zero as Azero,
} from "fp-ts/Array"
import {
  type NonEmptyArray,
  splitAt as NEAsplitAt,
  last as NEAlast,
  init as NEAinit,
  intersperse as NEAintersperse,
} from "fp-ts/NonEmptyArray"
import { bindTo as IbindTo, let as Ilet } from "fp-ts/Identity"
import { Do as ODo, bind as Obind, let as Olet } from "fp-ts/Option"
import { slice, trimRight } from "fp-ts/string"
import { match } from "ts-pattern"
import { type PublicationItem } from "../hooks/useFetchPublications"

const formatFullAuthorList = (lastNames: NonEmptyArray<string>) =>
  pipe(
    lastNames,
    IbindTo("all"),
    Ilet("final", ({ all }) => NEAlast(all)),
    Ilet("rest", ({ all }) => NEAinit(all)),
    Ilet("withCommas", ({ rest }) =>
      pipe(
        rest,
        Aintersperse(", "),
        Areduce("", (b, a) => b + a),
      ),
    ),
    ({ withCommas, final }) => `${withCommas} & ${final}`,
  )

const getAuthorsCitationString = (
  authors: Array<string>,
  options?: { limit: number },
) => {
  const { limit } = { limit: 100, ...options }
  return pipe(
    authors,
    Amap((a) => a.split(" ")),
    Amap(last),
    Acompact,
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
          (l) => l > 2 && l <= limit,
          () => formatFullAuthorList(lastNames as NonEmptyArray<string>),
        )
        .when(
          (l) => l > limit,
          () => `${lastNames[0]} et al`,
        )
        .otherwise(() => `Unexpected Error`),
  )
}

const removeTags = (string: string) => string.replaceAll(/<\/?\w+>/g, "")

const getPublicationYear = (publicationDate: string) =>
  new Date(publicationDate).getFullYear()

const limitCharacters = (text: string, limit: number) =>
  text.length > limit ? `${text.slice(0, limit).trimEnd()}..` : text

// add check for already ending in punctation
const formatTitle = (title: string) =>
  pipe(
    title,
    IbindTo("initial"),
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
  `${getAuthorsCitationString(authors)}. (${getPublicationYear(
    publishDate,
  )}). "${limitCharacters(removeTags(title), 90)}." ${journal}`

export {
  createCitation,
  getAuthorsCitationString,
  removeTags,
  getPublicationYear,
  limitCharacters,
  formatTitle,
}
