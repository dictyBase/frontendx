import { pipe, flow } from "fp-ts/function"
import { filter as Afilter } from "fp-ts/Array"
import { not, or } from "fp-ts/Predicate"
import { isThisMonth } from "date-fns"
import { parseISO, differenceInCalendarMonths } from "date-fns/fp"
import { ListContentByNamespaceQuery } from "dicty-graphql-schema"

type ContentList = ListContentByNamespaceQuery["listContentByNamespace"]

type ContentListItem = ContentList[0]

const getContentDate = flow(
  ({ created_at }: ContentListItem) => created_at,
  parseISO,
)

const contentFromThisMonth = flow(getContentDate, isThisMonth)

const contentFromLastMonth = flow(
  getContentDate,
  differenceInCalendarMonths(new Date()),
  (difference) => Math.abs(difference) === 1,
)

const remainingContent = pipe(contentFromThisMonth, or(contentFromLastMonth), not)

const groupByDate = (contentList: ContentList) =>
  ([
    ["Most Recent", pipe(contentList, Afilter(contentFromThisMonth))],
    ["Last Month", pipe(contentList, Afilter(contentFromLastMonth))],
    ["Older Posts", pipe(contentList, Afilter(remainingContent))],
  ]) as Array<[string, ContentList]>

export { groupByDate }
