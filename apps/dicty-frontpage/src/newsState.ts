import { PrimitiveAtom, atom } from "jotai"
import {
  ListContentByNamespaceQuery,
} from "dicty-graphql-schema"

const selectedNewsArticlesAtom = atom<ListContentByNamespaceQuery["listContentByNamespace"]>([])

export { selectedNewsArticlesAtom }
