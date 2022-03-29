import {
  GeneQuery,
  GenomicCoordinates,
  NameWithLink,
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
    | GenomicCoordinates[]
    | null
    | undefined
}

interface PanelReqProps {
  id: string
  value:
    | string
    | string[]
    | NameWithLink
    | GenomicCoordinates[]
    | null
    | undefined
}

/*
  This function will take in props and return the Panel Items
*/
const panelGenerator = (
  req: PanelReqProps[],
  type: string,
  gene: GeneQuery,
) => {
  let returnArray: PanelReturnType[] = []
  if (!gene[type as keyof GeneQuery]) {
    /* Check to see if section exists */
    return
  }

  req.forEach((element) => {
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
  value: string | string[] | NameWithLink | GenomicCoordinates[],
  gene: GeneQuery,
) => {
  /*
  Why switch over map
  https://medium.com/front-end-weekly/switch-case-if-else-or-a-lookup-map-a-study-case-de1c801d944
 */
  switch (id) {
    case "Gene Name":
      return value
    case "Name Description":
      // if (value === null || value === undefined || !Array.isArray(value)) return
      return (value as string[]).map((desc, i) => (
        <React.Fragment key={i}>
          {desc}
          <br />
        </React.Fragment>
      ))
    case "Alternative Gene Names":
      // if (value === null || value === undefined || !Array.isArray(value)) return
      /* Using Type Assertion because I know that this will be a string[] */
      return <i>{commaSeparate(value as string[])}</i>
    case "Gene ID":
      return value
    case "Gene Product":
      return value
    case "Alternative Protein Names":
      // if (value === null || value === undefined || !Array.isArray(value)) return
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
      // if (value === null || value === undefined || Array.isArray(value)) return
      // if (typeof value === "string") return
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
      // if (value === null || value === undefined || Array.isArray(value)) return
      // if (typeof value !== "string") return
      return (
        <a href={value as string}>Protein sequence, domains and much more...</a>
      )
    case "Genomic Coords.":
      return <TableDisplay data={value as GenomicCoordinates[]}></TableDisplay>
  }
}

export { panelGenerator }

