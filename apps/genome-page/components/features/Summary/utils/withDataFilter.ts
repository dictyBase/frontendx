import { With } from "dicty-graphql-schema"

const emptyArray = (array: Array<With>) =>
  !Array.isArray(array) || array.length === 0

// function to filter the With data
const withDataFilter = (array: Array<With>) => {
  let finalArray = array
  // filter by db type
  const dictyBase = array.filter((item) => item.db === "dictyBase").slice(0, 2)
  const uniProtKB = array.filter((item) => item.db === "UniProtKB").slice(0, 2)
  const MGI = array.filter((item) => item.db === "MGI").slice(0, 2)
  const RGD = array.filter((item) => item.db === "RGD").slice(0, 2)
  const SGD = array.filter((item) => item.db === "SGD").slice(0, 2)
  const PomBase = array.filter((item) => item.db === "PomBase").slice(0, 2)

  // order of preference to display With data
  // dictyBase => UniProt => MGI => RGD => SGD => PomBase
  if (!emptyArray(dictyBase)) {
    finalArray = dictyBase
  }
  if (!emptyArray(uniProtKB)) {
    finalArray = uniProtKB
  }
  if (!emptyArray(MGI)) {
    finalArray = MGI
  }
  if (!emptyArray(RGD)) {
    finalArray = RGD
  }
  if (!emptyArray(SGD)) {
    finalArray = SGD
  }
  if (!emptyArray(PomBase)) {
    finalArray = PomBase
  }

  return finalArray
}

export { emptyArray }
export { withDataFilter }
