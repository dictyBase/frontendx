import { styled } from "@mui/material/styles"
import Box, { BoxProps } from "@mui/material/Box"

interface MorphingButtonBoxProperties extends BoxProps {
  isExpanded: boolean
}

const MorphingButtonTextFieldBox = styled(Box)<MorphingButtonBoxProperties>(
  ({ isExpanded }) => ({
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    pointerEvents: isExpanded ? "auto" : "none",
  }),
)

export { MorphingButtonTextFieldBox }
