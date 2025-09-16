import { useRouter } from "next/router"
import { Box, Button } from "@material-ui/core"
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace"

const RelatedGenesNavigation = () => {
  const router = useRouter()
  const geneId = router.query.id as string
  const handleClick = () => {
    router.push(`/${geneId}/references/`)
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
