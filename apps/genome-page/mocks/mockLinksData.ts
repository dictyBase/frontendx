import { Links, NameWithLink } from "dicty-graphql-schema"

const mockLinksData: Links = {
  expression: [
    {
      name: "dictyExpress (RNA-Seq)",
      link: "https://ailab.si/dictyexpress/run/index.php?gene=DDB_G0288511&db=rnaseq",
    },
  ] as NameWithLink[],
  colleagues: {
    name: "sadA Researchers",
    link: "http://dictybase.org/db/cgi-bin/dictyBase/colleague/colleagueSearch?locus=207301",
  } as NameWithLink,
  ext_resources: [
    {
      name: "GenBank Protein",
      link: "http://www.ncbi.nlm.nih.gov/protein/EAL63177.1",
    },
    {
      name: "UniProtKB: Q8I7T3",
      link: "http://www.uniprot.org/entry/?query=Q8I7T3",
    },
    {
      name: "Ensembl",
      link: "http://protists.ensembl.org/Dictyostelium_discoideum/Gene/Summary?db=core;g=DDB_G0288511",
    },
    {
      name: "ENA",
      link: "http://www.ebi.ac.uk/ena/data/view/EAL63177.1",
    },
  ] as NameWithLink[],
}

export default mockLinksData
