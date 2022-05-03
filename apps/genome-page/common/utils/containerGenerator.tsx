import AssociatedSequencePanel from "components/features/Summary/Panels/AssociatedSequencePanel"
import GeneralInfoPanel from "components/features/Summary/Panels/GeneralInfoPanel"
import GoaPanel from "components/features/Summary/Panels/GoaPanel"
import LinkPanel from "components/features/Summary/Panels/LinksPanel"
import ProductInfoPanel from "components/features/Summary/Panels/ProductInfoPanel"
import ReferencesPanel from "components/features/Summary/Panels/ReferencesPanel"
import { GeneQuery } from "dicty-graphql-schema"
import React from "react"

interface ChildContent {
  panelProps: {
    id: string
    title: string
    route: string
  }
  child: JSX.Element | undefined
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

/*
  containerGenerator returns ChildContent[] if the sectionId, element of arrayOfSections, exists.
  Props: 
   - arrayOfSections: string[], an array of section ID's from the gene graphql query. You can console.log(gene) to understand.
   - gene: GeneQuery, the GraphQL query that was made
*/
const containerGenerator = (arrayOfSections: string[], gene: GeneQuery) => {
  return arrayOfSections.map((sectionId) => {
    if (gene[sectionId as keyof GeneQuery]) {
      return {
        panelProps:
          SummaryContainerContent[sectionId as keyof SummaryContainerTypes],
        child: returnComponentByName(
          SummaryContainerContent[sectionId as keyof SummaryContainerTypes].id,
          gene,
        ),
      }
    }
  }) as ChildContent[]
}

/* An object that contains the Props of PanelWrapper for the respective sectionId */
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

/*
  returnComponentByName returns the Component from passed in id
  Props:
    - id: a string that represents a section from SummaryPage
    - gene: the GraphQL gene query
*/
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

/*
  createRouteFromString returns the correct string path which can be used in the route prop of Panel Wrapper
  Props:
    - link: string
*/
const createRouteFromString = (link: string, gene: GeneQuery) => {
  if ("/gene/${geneId}/references") {
    let numPubs = gene.allPublications.num_pubs.toString()
    link = link.replace("${gene.allPublications.num_pubs", numPubs)
  }
  let geneName = gene.gene!.name!.toString()
  link = link.replace("${geneId}", geneName)
  return link
}

export { containerGenerator, createRouteFromString, returnComponentByName }
