/* eslint-disable unicorn/no-null */
import { ListNewsContentQuery } from "dicty-graphql-schema"
import { atom } from "jotai"

export const listArticlesAtom = atom<
  NonNullable<ListNewsContentQuery["listContent"]>
>([])

// Selection Atoms

export const selectedArticlesAtom = atom<string[]>([])

export const addSelectedArticlesAtom = atom(
  null,
  (_get, set, targetArticle: string) => {
    set(selectedArticlesAtom, (previous) => [...previous, targetArticle])
  },
)

export const removeSelectedArticlesAtom = atom(
  null,
  (_get, set, targetArticle: string) => {
    set(selectedArticlesAtom, (previous) =>
      previous.filter((element) => element !== targetArticle),
    )
  },
)

export const clearSelectedArticles = atom(null, (_get, set) => {
  set(selectedArticlesAtom, [])
})

export const selectAllArticles = atom(null, (_get, set) => {
  set(
    selectedArticlesAtom,
    _get(listArticlesAtom)?.map((article) => article.id),
  )
})

// Pagination Atoms

export const articlesListTotalAtom = atom(0)
export const articlesListQueryLimitAtom = atom(10)
export const articlesListQueryOffsetAtom = atom(0)
export const articlesListCurrentPageAtom = atom(1)
export const articlesInRangeAtom = atom((get) => {
  const start =
    get(articlesListQueryLimitAtom) * (get(articlesListCurrentPageAtom) - 1)
  const end = start + get(articlesListQueryLimitAtom)
  return [start, end]
})
