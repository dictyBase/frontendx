import type { SxProps } from "@mui/material"
import { alpha, keyframes, type Theme } from "@mui/material/styles"

const AURA_THICKNESS = "1.5px"
const AURA_ROTATION_DURATION = "4s"

type AuraStyles = Readonly<{ root: SxProps<Theme> }>

const rotate = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`

const glow = (theme: Theme, opacity: number, blur: number): string =>
  `0 0 ${blur}px ${alpha(theme.palette.secondary.main, opacity)}`

const tint = (color: string): string => `linear-gradient(${color}, ${color})`

const useAuraStyles = (): AuraStyles => ({
  root: (theme: Theme) => ({
    position: "relative",
    display: "inline-flex",
    padding: AURA_THICKNESS,
    overflow: "hidden",
    isolation: "isolate",
    borderRadius: `${theme.shape.borderRadius}px`,
    boxShadow: `${theme.shadows[2]}, ${glow(theme, 0.3, 10)}`,
    transition: theme.transitions.create(["transform", "box-shadow"], {
      duration: theme.transitions.duration.short,
    }),
    "&:hover, &:focus-within": {
      transform: "translateY(-1px)",
      boxShadow: `${theme.shadows[4]}, ${glow(theme, 0.45, 14)}`,
    },
    // Oversized square keeps the rotating gradient covering every corner.
    "&::before": {
      content: '""',
      position: "absolute",
      zIndex: -1,
      top: "50%",
      left: "50%",
      width: "150%",
      aspectRatio: "1",
      backgroundImage: `conic-gradient(from 0deg, transparent 0 55%, ${theme.palette.info.main} 75%, ${theme.palette.secondary.main} 92%, transparent 100%)`,
      backgroundColor: alpha(theme.palette.secondary.main, 0.25),
      transform: "translate(-50%, -50%)",
      animation: `${rotate} ${AURA_ROTATION_DURATION} linear infinite`,
    },
    "@media (prefers-reduced-motion: reduce)": {
      transition: "none",
      "&:hover, &:focus-within": { transform: "none" },
      "&::before": { animation: "none" },
    },
    "& > *": {
      borderRadius: `calc(${theme.shape.borderRadius}px - ${AURA_THICKNESS})`,
      backgroundColor: theme.palette.background.paper,
    },
    "& > *:hover": {
      backgroundColor: theme.palette.background.paper,
      backgroundImage: tint(alpha(theme.palette.secondary.main, 0.1)),
    },
  }),
})

export { useAuraStyles }
