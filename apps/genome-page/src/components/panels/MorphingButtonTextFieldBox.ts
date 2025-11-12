import { styled } from "@mui/material/styles"
import Box, { BoxProps } from "@mui/material/Box"

interface MorphingButtonTextFieldBoxProperties extends BoxProps {
  isExpanded: boolean
}

const MorphingButtonTextFieldBox = styled(Box, {
  shouldForwardProp: (properties) => properties !== "isExpanded",
})<MorphingButtonTextFieldBoxProperties>(({ isExpanded }) => ({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  pointerEvents: isExpanded ? "auto" : "none",
}))

export { MorphingButtonTextFieldBox }
