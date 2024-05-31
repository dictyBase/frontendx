import React from "react"
import { commaSeparate } from "./strings"

type ContentId =
  | "Gene Name"
  | "Name Description"
  | "Alternative Gene Names"
  | "Alternative Protein Names"
  | "Description"
  | "Protein Coding Gene"
  | "Protein Length"
  | "Molecular Weight"
  | "More Protein Data"
  | "Genomic Coords."
  | "Expression"
  | "External Resources"
  | "dictyBase Colleagues"
  | "GenBank Genomic Fragment"
  | "GenBank mRNA"
  | "AA Composition"
  | "ESTs"
  | "Note"
  | "Gene Product"
  | "dictyBase ID"
  | "Description"
  | "Protein Length"
  | "Molecular Weight"
  | "Subcellular location"
  | "Protein existence"

const returnPanelContentById = (
  id: ContentId,
  value: string | string[],
  //    | NameWithLink
  //    | NameWithLink[]
  //    | GenomicCoordinates[]
  //    | AssociatedSequences,
  // gene: GeneQuery,
) => {
  /*
  Why switch over map
  https://medium.com/front-end-weekly/switch-case-if-else-or-a-lookup-map-a-study-case-de1c801d944
  Using Type Assertion because this function will know what to return
 */
  switch (id) {
    case "Name Description":
      return (value as string[]).map((desc) => (
        <React.Fragment key={desc}>
          {desc}
          <br />
        </React.Fragment>
      ))
    case "Alternative Gene Names":
      return <i>{commaSeparate(value as string[])}</i>
    case "Alternative Protein Names":
      return (value as string[]).map((name) => (
        <React.Fragment key={name}>
          {name}
          <br />
        </React.Fragment>
      ))
    /* Product Info Panel */
    //    case "Protein Coding Gene":
    //      return (
    //        <>
    //          <a href={(value as NameWithLink).link}>
    //            {(value as NameWithLink).name}
    //          </a>
    //          <Image
    //            src="/icon_yes_green.png"
    //            alt="Yes Icon"
    //            width={30}
    //            height={30}
    //          />
    //          (Curator reviewed)
    //          <br />
    //          Derived from gene prediction. Supported by mRNA.
    //        </>
    //      )
    case "Protein Length":
      return value as string
    case "Molecular Weight":
      return value as string
    case "More Protein Data":
      return (
        <a href={value as string}>Protein sequence, domains and much more...</a>
      )
    //    case "Genomic Coords.":
    //      return <TableDisplay data={value as GenomicCoordinates[]} />
    /* Links Panel */
    //    case "Expression":
    //    case "External Resources":
    //      return (value as NameWithLink[]).map((item) => (
    //        <a href={item.link} key={item.link}>
    //          {item.name} |{" "}
    //        </a>
    //      ))
    /* Associated Sequence Panel */
    //    case "dictyBase Colleagues":
    //    case "GenBank Genomic Fragment":
    //    case "GenBank mRNA":
    //    case "AA Composition":
    //      return (
    //        <a href={(value as NameWithLink).link}>
    //          {(value as NameWithLink).name}
    //        </a>
    //      )
    //
    //    case "ESTs":
    //      return (
    //        <>
    //          {(value as NameWithLink[]).map((item) => (
    //            <React.Fragment key={item.link}>
    //              <a href={item.link}>{item.name}</a>
    //              &nbsp;&nbsp;&nbsp;
    //            </React.Fragment>
    //          ))}
    //          <a href={(value as AssociatedSequences).more_link}>more..</a>
    //        </>
    //      )
    case "Note":
      return <strong>{value as string}</strong>
    default:
      return value
  }
}

const panelGenerator = (
  arrayOfChildSections: any[],
  type: string,
  gene: any,
) => {
  const returnArray: any[] = []
  if (!gene[type]) {
    /* Check to see if section exists */
    return []
  }

  arrayOfChildSections.forEach((element) => {
    if (element.value !== null && element.value !== undefined) {
      const entry = {
        leftDisplay: element.id,
        rightDisplay: returnPanelContentById(element.id, element.value),
        // GeneQuery data is currently not used by returnPanelContentById, so it will not be passed for now.
        // rightDisplay: returnPanelContentById(element.id, element.value, gene),
      }
      returnArray.push(entry)
    }
  })

  return returnArray
}

export { type ContentId, panelGenerator, returnPanelContentById }
