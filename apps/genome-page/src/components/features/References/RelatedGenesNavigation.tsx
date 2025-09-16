import { useParams, useNavigate } from "react-router-dom"
import { Box, Button } from "@material-ui/core"
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace"

const RelatedGenesNavigation = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const geneId = id as string
  const handleClick = () => {
    navigate(`/${geneId}/references/`)
  }
  return (
    <Box>
      <Button startIcon={<KeyboardBackspaceIcon />} onClick={handleClick}>
        Back
      </Button>
    </Box>
  )
}

export { RelatedGenesNavigation }
