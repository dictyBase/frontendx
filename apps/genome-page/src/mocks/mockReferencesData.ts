import { PublicationWithGene, Gene } from "dicty-graphql-schema"

const mockReferencesData: PublicationWithGene[] = [
  {
    id: "12499361",
    authors: [
      { last_name: "Fey" },
      { last_name: "Stephens" },
      { last_name: "Titus" },
      { last_name: "Chisholm" },
    ],
    title: "SadA, a novel adhesion receptor in Dictyostelium.",
    journal: "J Cell Biol",
    issue: "159:1109-19",
    related_genes: Array<Gene>(),
  } as PublicationWithGene,
  {
    id: "1732",
    authors: [{ last_name: "Williams" }, { last_name: "Harwood" }],
    title: "Cell polarity and Dictyostelium development.",
    journal: "Curr Opin Microbiol",
    issue: "6:621-7",
    related_genes: Array<Gene>(),
  } as PublicationWithGene,
]

export default mockReferencesData
