import AssociatedSequencePanel from "components/features/Summary/Panels/AssociatedSequencePanel"
import GeneralInfoPanel from "components/features/Summary/Panels/GeneralInfoPanel"
import GoaPanel from "components/features/Summary/Panels/GoaPanel"
import LinkPanel from "components/features/Summary/Panels/LinksPanel"
import ProductInfoPanel from "components/features/Summary/Panels/ProductInfoPanel"
import ReferencesPanel from "components/features/Summary/Panels/ReferencesPanel"
import { GeneQuery } from "dicty-graphql-schema"
import React from "react"

interface ReturnProps {
  props: {
    id: string
    title: string
    route: string
  }
  component: JSX.Element | undefined
}

interface ContainerProps {
  id: string
  title: string
  route: string
}

interface SummaryContainerTypes {
  generalInformation: ContainerProps
  gene: ContainerProps
  listGeneProductInfo: ContainerProps
  getAssociatedSequnces: ContainerProps
  getLinks: ContainerProps
  allPublications: ContainerProps
}

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
    route: "/gene/${geneId}/references",
  },
}

const returnComponentByName = (id: string, gene: GeneQuery) => {
  switch (id) {
    case "generalInformation":
      return <GeneralInfoPanel gene={gene}></GeneralInfoPanel>
    case "gene":
      return <GoaPanel data={gene} />
    case "listGeneProductInfo":
      return <ProductInfoPanel gene={gene} />
    case "getAssociatedSequnces":
      return <AssociatedSequencePanel data={gene} />
    case "getLinks":
      return <LinkPanel data={gene} />
    case "allPublications":
      return <ReferencesPanel gene={gene} />
    default:
      return
  }
}

const createRouteFromString = (target: string, gene: GeneQuery) => {
  switch (target) {
    case "geneId":
      return target.replace("$(geneId}", `${gene.gene?.name}`)
    case "allPublications":
      return target.replace(
        "${gene.allPublications.num_pubs",
        `${gene.allPublications.num_pubs}`,
      )
    default:
      return
  }
}

/* 
  This function will take in props and return the container items
*/
const containerGenerator = (req: string[], gene: GeneQuery) => {
  return req.map((element) => {
    if (gene[element as keyof GeneQuery]) {
      return {
        props: SummaryContainerContent[element as keyof SummaryContainerTypes],
        component: returnComponentByName(
          SummaryContainerContent[element as keyof SummaryContainerTypes].id,
          gene,
        ),
      }
    }
  })
}

export { containerGenerator, createRouteFromString, returnComponentByName }
