import { PublicationWithGene } from "dicty-graphql-schema"

type SelectedPublication = Pick<
  PublicationWithGene,
  "id" | "title" | "related_genes"
>

export { type SelectedPublication }
