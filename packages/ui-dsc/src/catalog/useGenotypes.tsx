/**
 * useGenotypes is a hook for separating the genotype data into
 * drug resistances and non drug resistance.
 */

const useGenotypes = (genotypes: string) => {
  const drugResistances = new Set([
    "neoR",
    "bsR",
    "hygR",
    "tetR",
    "phleoR",
    "bleoR",
  ])
  const splitGenotype = genotypes.split(",")

  return {
    nonDrugResistances: splitGenotype.filter(
      (item: string) => !drugResistances.has(item),
    ),
    drugResistances: splitGenotype.filter((item: string) =>
      drugResistances.has(item),
    ),
  }
}

export { useGenotypes }
