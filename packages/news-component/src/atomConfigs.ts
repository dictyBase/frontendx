import { atom } from "jotai"

export const selectedArticlesAtom = atom<string[]>([])

export const addSelectedArticlesAtom = atom(
  // eslint-disable-next-line unicorn/no-null
  null,
  (_get, set, targetArticle: string) => {
    set(selectedArticlesAtom, (previous) => [...previous, targetArticle])
  },
)

export const removeSelectedArticlesAtom = atom(
  // eslint-disable-next-line unicorn/no-null
  null,
  (_get, set, targetArticle: string) => {
    set(selectedArticlesAtom, (previous) =>
      previous.filter((element) => element !== targetArticle),
    )
  },
)

export const clearSelectedArticles = atom(
  // eslint-disable-next-line unicorn/no-null
  null,
  (_get, set) => {
    set(selectedArticlesAtom, [])
  },
)
