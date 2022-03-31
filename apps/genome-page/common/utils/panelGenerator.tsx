import {
  GeneQuery,
  GenomicCoordinates,
  NameWithLink,
  AssociatedSequences,
} from "dicty-graphql-schema"
import React from "react"
import Image from "next/image"
import { commaSeparate } from "./strings"
import TableDisplay from "components/panels/GenomicCoordsTable"

interface PanelReturnType {
  leftDisplay: string
  rightDisplay:
    | string
    | string[]
    | JSX.Element
    | JSX.Element[]
    | NameWithLink
    | NameWithLink[]
    | GenomicCoordinates[]
    | AssociatedSequences
    | null
    | undefined
}

interface PanelReqProps {
  id: string
  value:
    | string
    | string[]
    | NameWithLink
    | NameWithLink[]
    | GenomicCoordinates[]
    | AssociatedSequences
    | null
    | undefined
}

/*
  This function will take in props and return the Panel Items
  Integrated Panels:
  - General Info Panel
  - Product Info Panel
  = Links Panel
  - Associated Sequence Panel
*/
const panelGenerator = (
  arrayOfChildSections: PanelReqProps[],
  type: string,
  gene: GeneQuery,
) => {
  let returnArray: PanelReturnType[] = []
  if (!gene[type as keyof GeneQuery]) {
    /* Check to see if section exists */
    return
  }

  arrayOfChildSections.forEach((element) => {
    if (element.value !== null && element.value !== undefined) {
      let entry = {
        leftDisplay: element.id,
        rightDisplay: returnPanelContentById(element.id, element.value, gene),
      }
      returnArray.push(entry)
    }
  })

  return returnArray
}

const returnPanelContentById = (
  id: string,
  value:
    | string
    | string[]
    | NameWithLink
    | NameWithLink[]
    | GenomicCoordinates[]
    | AssociatedSequences,
  gene: GeneQuery,
) => {
  /*
  Why switch over map
  https://medium.com/front-end-weekly/switch-case-if-else-or-a-lookup-map-a-study-case-de1c801d944
  Using Type Assertion because this function will know what to return
 */
  switch (id) {
    case "Gene Name":
      return value
    case "Name Description":
      return (value as string[]).map((desc, i) => (
        <React.Fragment key={i}>
          {desc}
          <br />
        </React.Fragment>
      ))
    case "Alternative Gene Names":
      return <i>{commaSeparate(value as string[])}</i>
    case "Gene ID":
      return value
    case "Gene Product":
      return value
    case "Alternative Protein Names":
      return (value as string[]).map((name, i) => (
        <React.Fragment key={i}>
          {name}
          <br />
        </React.Fragment>
      ))
    case "Description":
      return value
    /* Product Info Panel */
    case "Protein Coding Gene":
      return (
        <>
          <a href={(value as NameWithLink).link}>
            {(value as NameWithLink).name}
          </a>
          <Image
            src="/icon_yes_green.png"
            alt="Yes Icon"
            width={30}
            height={30}
          />
          {"(Curator reviewed)"}
          <br />
          {"Derived from gene prediction. Supported by mRNA."}
        </>
      )
    case "Protein Length":
      return value as string
    case "Molecular Weight":
      return value as string
    case "More Protein Data":
      return (
        <a href={value as string}>Protein sequence, domains and much more...</a>
      )
    case "Genomic Coords.":
      return <TableDisplay data={value as GenomicCoordinates[]}></TableDisplay>
    /* Links Panel */
    case "Expression":
      return (value as NameWithLink[]).map((item, i) => (
        <a href={item.link} key={i}>
          {item.name} |{" "}
        </a>
      ))
    case "dictyBase Colleagues":
      return (
        <a href={(value as NameWithLink).link}>
          {(value as NameWithLink).name}
        </a>
      )
    case "External Resources":
      return (value as NameWithLink[]).map((item, i) => (
        <a href={item.link} key={i}>
          {item.name} |{" "}
        </a>
      ))
    /* Associated Sequence Panel */
    case "GenBank Genomic Fragment":
      return (
        <a href={(value as NameWithLink).link}>
          {(value as NameWithLink).name}
        </a>
      )
    case "GenBank mRNA":
      return (
        <a href={(value as NameWithLink).link}>
          {(value as NameWithLink).name}
        </a>
      )
    case "ESTs":
      return (
        <>
          {(value as AssociatedSequences).ests.map((item, i) => (
            <React.Fragment key={i}>
              <a href={item.link}>{item.name}</a>
              &nbsp;&nbsp;&nbsp;
            </React.Fragment>
          ))}
          <a href={(value as AssociatedSequences).more_link}>more..</a>
        </>
      )
  }
}

export { panelGenerator }
