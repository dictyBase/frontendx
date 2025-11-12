import { styled } from "@mui/material/styles"
import Box, { BoxProps } from "@mui/material/Box"

interface MorphingButtonBoxProperties extends BoxProps {
  isExpanded: boolean
}

const MorphingButtonBox = styled(Box)<MorphingButtonBoxProperties>(
  ({ isExpanded }) => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    height: 36,
    width: isExpanded ? 192 : 36,
    transition: "width 500ms cubic-bezier(0.4, 0, 0.2, 1)",
  }),
)

export { MorphingButtonBox }
