import { MouseEventHandler } from "react"
import { useRouter } from "next/router"
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
  const router = useRouter()
  const geneId = router.query.id as string
  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation()
    router.push(`/${geneId}/references/${publicationId}`)
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
