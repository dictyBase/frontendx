import { useRouter } from "next/router"
import { Chip } from "@material-ui/core"

type SeeAllGenesChipProperties = {
  publicationId: string
  geneCount: number
}

const SeeAllGenesChip = ({
  publicationId,
  geneCount,
}: SeeAllGenesChipProperties) => {
  const router = useRouter()
  const geneId = router.query.id as string
  const handleClick = () => {
    router.push(`/${geneId}/references/${publicationId}`)
  }
  return (
    <Chip
      clickable
      key="see-all"
      label={`See all ${geneCount}`}
      size="small"
      color="secondary"
      onClick={handleClick}
      style={{ margin: "0px 5px 5px 0px" }}
    />
  )
}

export { SeeAllGenesChip }
