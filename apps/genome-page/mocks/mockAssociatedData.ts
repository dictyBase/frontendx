import { AssociatedSequences, NameWithLink } from "dicty-graphql-schema"

const mockAssociatedData: AssociatedSequences = {
  genbank_genomic_fragment: {
    name: "AY178767",
    link: "http://www.ncbi.nlm.nih.gov/nuccore/AY178767",
  } as NameWithLink,
  genbank_mrna: null,
  ests: [
    { name: "DDB0025213", link: "" },
    { name: "DDB0029617", link: "" },
    { name: "DDB0031643", link: "" },
    { name: "DDB0085797", link: "" },
    { name: "DDB0032475", link: "" },
    { name: "DDB0024552", link: "" },
  ] as NameWithLink[],
}

export default mockAssociatedData
