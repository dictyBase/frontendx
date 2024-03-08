/* eslint-disable no-template-curly-in-string */
import { AssociatedSequencePanel } from "components/features/Summary/Panels/AssociatedSequencePanel"
import { GeneralInfoPanel } from "components/features/Summary/Panels/GeneralInfoPanel"
import { GoaPanel } from "components/features/Summary/Panels/GoaPanel"
import { LinkPanel } from "components/features/Summary/Panels/LinksPanel"
import { ProductInfoPanel } from "components/features/Summary/Panels/ProductInfoPanel"
import { ReferencesPanel } from "components/features/Summary/Panels/ReferencesPanel"
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

interface ContainerProperties {
  id: string
  title: string
  route: string
}

interface SummaryContainerTypes {
  generalInformation: ContainerProperties
  gene: ContainerProperties
  listGeneProductInfo: ContainerProperties
  getAssociatedSequnces: ContainerProperties
  getLinks: ContainerProperties
  allPublications: ContainerProperties
}

/* An object that contains the Props of PanelWrapper for the respective sectionId */
const SummaryContainerContent = {
  generalInformation: {
    id: "generalInformation",
    title: "General Information",
    // eslint-disable-next-line sonarjs/no-duplicate-string
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
      return <GeneralInfoPanel gene={gene} />
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
      return <></>
  }
}

/*
  containerGenerator returns ChildContent[] if the sectionId, element of arrayOfSections, exists.
  Props: 
   - arrayOfSections: string[], an array of section ID's from the gene graphql query. You can console.log(gene) to understand.
   - gene: GeneQuery, the GraphQL query that was made
*/
const containerGenerator = (arrayOfSections: string[], gene: GeneQuery) =>
  arrayOfSections
    .filter((sectionId) => sectionId in gene)
    .map((sectionId) => ({
      panelProps:
        SummaryContainerContent[sectionId as keyof SummaryContainerTypes],
      child: returnComponentByName(
        SummaryContainerContent[sectionId as keyof SummaryContainerTypes].id,
        gene,
      ),
    })) as ChildContent[]

/*
  createRouteFromString returns the correct string path which can be used in the route prop of Panel Wrapper
  Props:
    - link: string
*/
const createRouteFromString = (link: string, gene: GeneQuery) => {
  const numberPubs = gene.allPublications.num_pubs.toString()
  const geneName = gene.gene!.name!.toString()
  return link
    .replace("${geneId}", geneName)
    .replace("${gene.allPublications.num_pubs}", numberPubs)
}

export { containerGenerator, createRouteFromString, returnComponentByName }
