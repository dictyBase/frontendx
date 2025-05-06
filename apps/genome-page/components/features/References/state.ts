import { atom } from "jotai"
import { PublicationWithGene } from "dicty-graphql-schema"
import { Option, none } from "fp-ts/Option"

type SelectedPublication = Pick<PublicationWithGene, "id" | "title" | "related_genes">
const selectedPublication = atom<Option<SelectedPublication>>(none)

export { type SelectedPublication, selectedPublication }
