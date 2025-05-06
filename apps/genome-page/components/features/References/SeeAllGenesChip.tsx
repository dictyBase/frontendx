import { Chip } from "@material-ui/core"
import { useSetAtom } from "jotai"
import { some } from "fp-ts/Option"
import { PublicationWithGene } from "dicty-graphql-schema"
import { selectedPublication } from "./state"

type SeeAllGenesChipProperties = {
  publication: Pick<PublicationWithGene, "id" | "related_genes">
}

const SeeAllGenesChip = ({ publication }: SeeAllGenesChipProperties) => {
  const setPublication = useSetAtom(selectedPublication)
  const handleClick = () => {
    setPublication(some(publication))
  }
  return (
    <Chip
      clickable
      key="see-all"
      label="See all"
      size="small"
      color="secondary"
      onClick={handleClick}
      style={{ margin: "0px 5px 5px 0px" }}
    />
  )
}

export { SeeAllGenesChip }
