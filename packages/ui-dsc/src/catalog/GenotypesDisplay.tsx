import { pipe } from "fp-ts/function"
import { mapWithIndex } from "fp-ts/Array"
import { useGenotypes } from "./useGenotypes"

// formatElements adds comma to each element except for the last one
const formatElements = (index: number, item: string) =>
  (index ? "," : "") + item

type GenotypesDisplayProperties = {
  /** List of genotypes in string format */
  genotypes: string
}

/**
 * GenotypesDisplay organizes genotypes with non drug resistances italicized
 * and with drug resistances at the end
 */
const GenotypesDisplay = ({ genotypes }: GenotypesDisplayProperties) => {
  const { nonDrugResistances, drugResistances } = useGenotypes(genotypes)

  return (
    <span data-testid="all-genotypes">
      <em data-testid="italicized-genotypes">
        {pipe(
          nonDrugResistances,
          mapWithIndex((index: number, item: string) =>
            drugResistances.length > 0
              ? `${item},`
              : formatElements(index, item),
          ),
        )}
      </em>
      {pipe(drugResistances, mapWithIndex(formatElements))}
    </span>
  )
}

export { GenotypesDisplay }
