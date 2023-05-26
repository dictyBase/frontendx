/* eslint-disable unicorn/no-null */
import { ListNewsContentQuery } from "dicty-graphql-schema"
import { atom } from "jotai"

export const listArticlesAtom = atom<
  NonNullable<ListNewsContentQuery["listContent"]>
>([])

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
