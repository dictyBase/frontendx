import { With } from "common/@types/gene-data"

const emptyArray = (arr: Array<With>) => !Array.isArray(arr) || !arr.length

// function to filter the With data
const withDataFilter = (arr: Array<With>) => {
  // filter by db type
  const dictyBase = arr.filter((item) => item.db === "dictyBase").slice(0, 2)
  const uniProtKB = arr.filter((item) => item.db === "UniProtKB").slice(0, 2)
  const MGI = arr.filter((item) => item.db === "MGI").slice(0, 2)
  const RGD = arr.filter((item) => item.db === "RGD").slice(0, 2)
  const SGD = arr.filter((item) => item.db === "SGD").slice(0, 2)
  const PomBase = arr.filter((item) => item.db === "PomBase").slice(0, 2)

  // order of preference to display With data
  // dictyBase => UniProt => MGI => RGD => SGD => PomBase
  if (!emptyArray(dictyBase)) return dictyBase
  if (!emptyArray(uniProtKB)) return uniProtKB
  if (!emptyArray(MGI)) return MGI
  if (!emptyArray(RGD)) return RGD
  if (!emptyArray(SGD)) return SGD

  return PomBase
}

export { emptyArray }
export default withDataFilter
