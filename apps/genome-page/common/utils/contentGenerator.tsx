import AssociatedSequencePanel from "components/features/Summary/Panels/AssociatedSequencePanel"
import GeneralInfoPanel from "components/features/Summary/Panels/GeneralInfoPanel"
import GoaPanel from "components/features/Summary/Panels/GoaPanel"
import LinkPanel from "components/features/Summary/Panels/LinksPanel"
import ProductInfoPanel from "components/features/Summary/Panels/ProductInfoPanel"
import ReferencesPanel from "components/features/Summary/Panels/ReferencesPanel"
import PanelWrapper from "components/panels/PanelWrapper"
import { Content, GeneQuery, Gene } from "dicty-graphql-schema"
import { Component } from "react"

const SummaryContainerContent = {
  generalInformation: {
    id: "generalInformation",
    title: "General Information",
    route: "/gene/${geneId}/",
  },
  gene: {
    id: "gene",
    title: "Latest Gene Ontology Annotations",
    route: "/gene/${geneId}/goannotations",
  },
  listGeneProductInfo: {
    id: "listGeneProductInfo",
    title: "Gene Product Information",
    route: "/gene/${geneId}/",
  },
  getAssociatedSequnces: {
    id: "getAssociatedSequnces",
    title: "Associated Sequences",
    route: "/gene/${geneId}/",
  },
  getLinks: {
    id: "getLinks",
    title: "Links",
    route: "/gene/${geneId}/",
  },
  allPublications: {
    id: "allPublications",
    title:
      "Latest References (press references tab to view all ${gene.allPublications.num_pubs} papers)",
    route: "`/gene/${geneId}/references`",
  },
}

const returnComponentByName = (id: string, gene: GeneQuery) => {
  switch (id) {
    case "generalInformation":
      ;<GeneralInfoPanel gene={gene}></GeneralInfoPanel>
      break
    case "gene":
      ;<GoaPanel data={gene} />
      break
    case "listGeneProductInfo":
      ;<ProductInfoPanel gene={gene} />
      break
    case "getAssociatedSequences":
      ;<AssociatedSequencePanel data={gene} />
      break
    case "getLinks":
      ;<LinkPanel data={gene} />
      break
    case "allPublications":
      ;<ReferencesPanel gene={gene} />
      break
  }
}

const convertStringToTemplateString = (target: string, gene: GeneQuery) => {
  /* Not efficient 
    I tried the regex but I had issue with converting a string to a string literal
  */
  if (target === "geneId")
    return target.replace("$(geneId}", `${gene.gene?.name}`)
  if (target === "allPublications")
    return target.replace(
      "${gene.allPublications.num_pubs",
      `${gene.allPublications.num_pubs}`,
    )
}

/* 
  This function will take in props and return the container items
*/
const contentGenerator = (req: string[], gene: GeneQuery) => {
  let returnArray: any[] = []
  console.log(gene)
  req.forEach((element) => {
    if (gene[element]) {
      let entry = {
        props: SummaryContainerContent[element],
        component: returnComponentByName(
          SummaryContainerContent[element].id,
          gene,
        ),
      }
      returnArray.push(entry)
    }
  })

  return returnArray
}

export {
  contentGenerator,
  convertStringToTemplateString,
  returnComponentByName,
}
