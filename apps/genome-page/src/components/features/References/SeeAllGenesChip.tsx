import { MouseEventHandler } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Chip } from "@mui/material"
import { grey } from "@mui/material/colors"

type SeeAllGenesChipProperties = {
  publicationId: string
  geneCount: number
}

const SeeAllGenesChip = ({
  publicationId,
  geneCount,
}: SeeAllGenesChipProperties) => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const geneId = id as string
  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation()
    navigate(`/${geneId}/references/${publicationId}`)
  }
  return (
    <Chip
      clickable
      key="see-all"
      size="medium"
      color="secondary"
      label={`See all ${geneCount}`}
      onClick={handleClick}
      sx={{
        margin: "0px 5px 5px 0px",
        "&:hover": {
          boxShadow: `1px 1px 2px ${grey[500]}`,
        },
      }}
    />
  )
}

export { SeeAllGenesChip }
