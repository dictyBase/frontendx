import { With } from "common/@types/gene-data"

const emptyArray = (arr: Array<With>) => !Array.isArray(arr) || !arr.length

// function to filter the With data
const withDataFilter = (arr: Array<With>) => {
  let finalArr = arr
  // filter by db type
  const dictyBase = arr.filter((item) => item.db === "dictyBase").slice(0, 2)
  const uniProtKB = arr.filter((item) => item.db === "UniProtKB").slice(0, 2)
  const MGI = arr.filter((item) => item.db === "MGI").slice(0, 2)
  const RGD = arr.filter((item) => item.db === "RGD").slice(0, 2)
  const SGD = arr.filter((item) => item.db === "SGD").slice(0, 2)
  const PomBase = arr.filter((item) => item.db === "PomBase").slice(0, 2)

  // order of preference to display With data
  // dictyBase => UniProt => MGI => RGD => SGD => PomBase
  if (!emptyArray(dictyBase)) {
    finalArr = dictyBase
  }
  if (!emptyArray(uniProtKB)) {
    finalArr = uniProtKB
  }
  if (!emptyArray(MGI)) {
    finalArr = MGI
  }
  if (!emptyArray(RGD)) {
    finalArr = RGD
  }
  if (!emptyArray(SGD)) {
    finalArr = SGD
  }
  if (!emptyArray(PomBase)) {
    finalArr = PomBase
  }

  return finalArr
}

export { emptyArray }
export default withDataFilter
