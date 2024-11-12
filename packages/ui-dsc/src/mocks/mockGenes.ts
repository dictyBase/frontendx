import { PlasmidQuery } from "dicty-graphql-schema"

const mockGenes: NonNullable<NonNullable<PlasmidQuery["plasmid"]>["genes"]> = [
  {
    __typename: "Gene",
    name: "erkB",
  },
  {
    __typename: "Gene",
    name: "kif8",
  },
  {
    __typename: "Gene",
    name: "cln3",
  },
  {
    __typename: "Gene",
    name: "tpp1",
  },
]

export { mockGenes }
