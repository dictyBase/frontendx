import { Links, NameWithLink } from "dicty-graphql-schema"

const mockLinksPiaA: Links = {
  expression: [
    {
      name: "dictyExpress (microarray)",
      link: "https://dictyexpress.research.bcm.edu/bcm/#/all",
    },
    {
      name: "dictyExpress (RNA-Seq)",
      link: "https://ailab.si/dictyexpress/run/index.php?gene=DDB_G0277399&db=rnaseq",
    },
  ] as NameWithLink[],
  colleagues: {
    name: "piaA Researchers",
    link: "http://dictybase.org/db/cgi-bin/dictyBase/colleague/colleagueSearch?locus=179785",
  } as NameWithLink,
  ext_resources: [
    {
      name: "STKE",
      link: "https://www.science.org/cgi/cm/stkecm;CMC_11286",
    },
    {
      name: "Inparanoid",
      link: "https://inparanoid.sbc.su.se/cgi-bin/gene_search.cgi?id=DDB_G0277399",
    },
    {
      name: "GenBank Protein",
      link: "https://www.ncbi.nlm.nih.gov/protein/EAL68662.1",
    },
    {
      name: "UniProtKB: O77203",
      link: "https://www.uniprot.org/uniprot/O77203",
    },
    {
      name: "Ensembl",
      link: "http://protists.ensembl.org/Dictyostelium_discoideum/Gene/Summary?db=core;g=DDB_G0277399;r=2:8027686-8031387;t=EAL68662",
    },
    {
      name: "ENA",
      link: "https://www.ebi.ac.uk/ena/browser/view/EAL68662.1",
    },
  ] as NameWithLink[],
}

export default mockLinksPiaA
