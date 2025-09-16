import { MouseEventHandler } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Chip, makeStyles } from "@material-ui/core"
import { grey } from "@material-ui/core/colors"

const useStyles = makeStyles({
  root: {
    margin: "0px 5px 5px 0px",
    "&:hover": {
      boxShadow: `1px 1px 2px ${grey[500]}`,
    },
  },
})
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
  const classes = useStyles()
  return (
    <Chip
      clickable
      key="see-all"
      size="medium"
      color="secondary"
      label={`See all ${geneCount}`}
      onClick={handleClick}
      className={classes.root}
    />
  )
}

export { SeeAllGenesChip }
