import { With } from "common/@types/gene-data"

const emptyArray = (arr: Array<With>) => !Array.isArray(arr) || !arr.length

// function to filter the With data
const withDataFilter = (arr: Array<With>) => {
  // filter With array by db type
  const dictyChecker = arr.filter((item) => item.db === "dictyBase").slice(0, 2)
  const uniprotChecker = arr
    .filter((item) => item.db === "UniProtKB")
    .slice(0, 2)
  const mgiChecker = arr.filter((item) => item.db === "MGI").slice(0, 2)
  const rgdChecker = arr.filter((item) => item.db === "RGD").slice(0, 2)
  const sgdChecker = arr.filter((item) => item.db === "SGD").slice(0, 2)
  const pomChecker = arr.filter((item) => item.db === "PomBase").slice(0, 2)

  // order of preference to display With data
  // dicty => UniProt => MGI => RGD => SGD => PomBase
  if (emptyArray(dictyChecker)) {
    if (emptyArray(uniprotChecker)) {
      if (emptyArray(mgiChecker)) {
        if (emptyArray(rgdChecker)) {
          if (emptyArray(sgdChecker)) {
            return pomChecker
          }
          return sgdChecker
        }
        return rgdChecker
      }
      return mgiChecker
    }
    return uniprotChecker
  }
  return dictyChecker
}

export { emptyArray }
export default withDataFilter
