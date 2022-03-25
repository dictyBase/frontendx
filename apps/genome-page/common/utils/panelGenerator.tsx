import { GeneQuery } from "dicty-graphql-schema"
import React from "react"
import { commaSeparate } from "./strings"

interface PanelReturnType {
  leftDisplay: string
  rightDisplay:
    | string
    | string[]
    | JSX.Element
    | JSX.Element[]
    | null
    | undefined
}

interface PanelReqProps {
  id: string
  value: string | string[] | null | undefined
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
  value: string | string[] | null | undefined,
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
      if (value === null || value === undefined || !Array.isArray(value)) return
      return value.map((desc, i) => (
        <React.Fragment key={i}>
          {desc}
          <br />
        </React.Fragment>
      ))
    case "Alternative Gene Names":
      if (value === null || value === undefined || !Array.isArray(value)) return
      return <i>{commaSeparate(value)}</i>
    case "Gene ID":
      return value
    case "Gene Product":
      return value
    case "Alternative Protein Names":
      if (value === null || value === undefined || !Array.isArray(value)) return
      return value.map((name, i) => (
        <React.Fragment key={i}>
          {name}
          <br />
        </React.Fragment>
      ))
    case "Description":
      return value
    default:
      return
  }
}

export { panelGenerator }
