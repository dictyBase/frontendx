import { With } from "common/@types/gene-data"

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
  if (!Array.isArray(dictyChecker) || !dictyChecker.length) {
    if (!Array.isArray(uniprotChecker) || !uniprotChecker.length) {
      if (!Array.isArray(mgiChecker) || !mgiChecker.length) {
        if (!Array.isArray(rgdChecker) || !rgdChecker.length) {
          if (!Array.isArray(sgdChecker) || !sgdChecker.length) {
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

export default withDataFilter
