import { useRouter } from "next/router"
import { Chip } from "@material-ui/core"

type SeeAllGenesChipProperties = {
  publicationId: string
  publicationCount: number
}

const SeeAllGenesChip = ({ publicationId }: SeeAllGenesChipProperties) => {
  const router = useRouter()
  const geneId = router.query.id as string
  const handleClick = () => {
    router.push(`/${geneId}/references/${publicationId}`)
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
