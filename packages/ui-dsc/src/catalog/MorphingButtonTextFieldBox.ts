import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { styled } from "@mui/material/styles"
import Box, { BoxProps } from "@mui/material/Box"

interface MorphingButtonTextFieldBoxProperties extends BoxProps {
  isExpanded: boolean
}

/**
 * Positioned container for the expanded input state of a morphing button.
 */
const MorphingButtonTextFieldBox = styled(
  Box,
)<MorphingButtonTextFieldBoxProperties>(({ isExpanded }) => ({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  pointerEvents: pipe(
    isExpanded,
    Bmatch(
      () => "none" as const,
      () => "auto" as const,
    ),
  ),
}))

export { MorphingButtonTextFieldBox, type MorphingButtonTextFieldBoxProperties }
