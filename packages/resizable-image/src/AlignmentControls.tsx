import { ButtonGroup, Button } from "@mui/material"
import { ALIGNMENT } from "./types"

type AlignmentControlsProperties = {
  onSetAlignment: (alignment: ALIGNMENT) => void
}

const AlignmentControls = ({ onSetAlignment }: AlignmentControlsProperties) => (
  <ButtonGroup
    variant="contained"
    color="secondary"
    aria-label="Alignment Button Group"
    sx={{
      position: "absolute",
      bottom: "50px",
      zIndex: 100,
    }}>
    <Button
      onClick={(event) => {
        event.stopPropagation()
        onSetAlignment(ALIGNMENT.LEFT)
      }}>
      LEFT
    </Button>
    <Button
      onClick={(event) => {
        event.stopPropagation()
        onSetAlignment(ALIGNMENT.CENTER)
      }}>
      CENTER
    </Button>
    <Button
      onClick={(event) => {
        event.stopPropagation()
        onSetAlignment(ALIGNMENT.RIGHT)
      }}>
      RIGHT
    </Button>
  </ButtonGroup>
)

export { AlignmentControls }
