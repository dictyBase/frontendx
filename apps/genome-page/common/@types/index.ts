import { PublicationWithGene } from "dicty-graphql-schema"

type SelectedPublication = Pick<
  PublicationWithGene,
  "id" | "title" | "related_genes" | "authors" | "journal" | "pages"
>

export { type SelectedPublication }
