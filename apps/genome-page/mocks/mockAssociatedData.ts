import { AssociatedSequences, NameWithLink } from "dicty-graphql-schema"

const mockAssociatedData: AssociatedSequences = {
  genbank_genomic_fragment: { name: "AY178767", link: "" } as NameWithLink,
  genbank_mrna: { name: "", link: "" } as NameWithLink,
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
