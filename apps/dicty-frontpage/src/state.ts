import { atom } from "jotai"
import { Option, none } from "fp-ts/Option"
import { ListContentByNamespaceQuery } from "dicty-graphql-schema"

const contentIdAtom = atom<Option<string>>(none)


const selectedNewsArticlesAtom = atom<
  ListContentByNamespaceQuery["listContentByNamespace"]
>([])

export { contentIdAtom, selectedNewsArticlesAtom }
