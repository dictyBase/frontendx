import { Orthologs } from "dicty-graphql-schema"

interface IMockOrthologsData {
  orthologs: Orthologs[]
}
/**
 * Reference: http://dictybase.org/gene/DDB_G0288511/phenotypes
 */
const mockOrthologsPiaA: IMockOrthologsData = {
  orthologs: [
    {
      id: {
        name: "DPU_G0058798",
        link: "http://dictybase.org/id/DPU_G0058798",
      },
      species: "Dictyostelium purpureum",
      uniprotkb: { name: "", link: "" },
      gene_product: "",
      source: ["JGI/Baylor Sequencing Project"],
    },
    {
      id: {
        name: "ENSP00000349959",
        link: "http://www.ensembl.org/Homo_sapiens/Transcript/ProteinSummary?db=core;protein=ENSP00000349959",
      },
      species: "Homo sapiens",
      uniprotkb: {
        name: "Q6R327-1",
        link: "http://www.uniprot.org/entry/Q6R327-1",
      },
      gene_product: "Rapamycin-insensitive companion of mTOR",
      source: ["InParanoid"],
    },
    {
      id: {
        name: "ENSP00000296782",
        link: "http://www.ensembl.org/Homo_sapiens/Transcript/ProteinSummary?db=core;protein=ENSP00000296782",
      },
      species: "",
      uniprotkb: {
        name: "Q6R327-3",
        link: "http://www.uniprot.org/entry/Q6R327-3",
      },
      gene_product: "Rapamycin-insensitive companion of mTOR",
      source: ["OrthoMCL"],
    },
    {
      id: {
        name: "ENSMUSP00000051809",
        link: "http://www.ensembl.org/Mus_musculus/Transcript/ProteinSummary?db=core;protein=ENSMUSP00000051809",
      },
      species: "Mus musculus",
      uniprotkb: { name: "", link: "" },
      gene_product: "",
      source: ["InParanoid", "OrthoMCL"],
    },
    {
      id: {
        name: "YER093C",
        link: "http://www.yeastgenome.org/cgi-bin/locus.fpl?dbid=YER093C",
      },
      species: "Saccharomyces cerevisiae S288c",
      uniprotkb: {
        name: "P40061",
        link: "http://www.uniprot.org/entry/P40061",
      },
      gene_product: "Target of rapamycin complex 2 subunit TSC11",
      source: ["InParanoid", "OrthoMCL"],
    },
    {
      id: {
        name: "FBpp0074458",
        link: "http://flybase.bio.indiana.edu/reports/FBpp0074458.html",
      },
      species: "Drosophila melanogaster",
      uniprotkb: {
        name: "Q9VWJ6",
        link: "http://www.uniprot.org/entry/Q9VWJ6",
      },
      gene_product: "FI03615p",
      source: ["InParanoid", "OrthoMCL"],
    },
    {
      id: {
        name: "WBGene00009245",
        link: "http://www.wormbase.org/db/gene/gene?name=WBGene00009245",
      },
      species: "Caenorhabditis elegans",
      uniprotkb: { name: "", link: "" },
      gene_product: "",
      source: ["OrthoMCL"],
    },
    {
      id: {
        name: "CE43301",
        link: "http://www.wormbase.org/db/gene/gene?name=CE43301",
      },
      species: "",
      uniprotkb: {
        name: "Q9XV48",
        link: "http://www.uniprot.org/entry/Q9XV48",
      },
      gene_product:
        "Protein F29C12.3, partially confirmed by transcript evidence",
      source: ["InParanoid"],
    },
  ],
}

export default mockOrthologsPiaA
