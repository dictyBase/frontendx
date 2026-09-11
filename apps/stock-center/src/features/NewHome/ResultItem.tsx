import { Box, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import {
  ACTIVE_BG,
  STRAIN_COLOR,
  STRAIN_BG,
  PLASMID_COLOR,
  PLASMID_BG,
} from "./types"

type TypeLabelProperties = {
  kind: "strain" | "plasmid"
}

const TypeLabel = ({ kind }: TypeLabelProperties) => (
  <Box
    component="span"
    sx={{
      flexShrink: 0,
      fontSize: "0.65rem",
      fontWeight: 700,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      px: "6px",
      py: "2px",
      borderRadius: "4px",
      color: kind === "strain" ? STRAIN_COLOR : PLASMID_COLOR,
      backgroundColor: kind === "strain" ? STRAIN_BG : PLASMID_BG,
      border: `1px solid ${kind === "strain" ? "#bee3f8" : "#c6f6d5"}`,
      lineHeight: 1.4,
    }}>
    {kind}
  </Box>
)

type ResultItemProperties = {
  id: string
  descriptor: string
  summary: string | undefined
  path: string
  kind: "strain" | "plasmid"
  isActive: boolean
}

const ResultItem = ({
  id,
  descriptor,
  summary,
  path,
  kind,
  isActive,
}: ResultItemProperties) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "flex-start",
      gap: 1.5,
      px: 2,
      py: 1.5,
      borderBottom: "1px solid #edf2f7",
      backgroundColor: isActive ? ACTIVE_BG : "transparent",
      "&:last-child": { borderBottom: "none" },
      "&:hover": { backgroundColor: "#f7fafc" },
    }}>
    <Box sx={{ pt: "2px" }}>
      <TypeLabel kind={kind} />
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Box
        component={RouterLink}
        to={`/${path}/${id}`}
        sx={{
          display: "block",
          fontSize: "0.9rem",
          fontWeight: 600,
          color: "#2b4acb",
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
          wordBreak: "break-word",
        }}>
        {descriptor}
      </Box>
      {summary && (
        <Typography
          sx={{
            fontSize: "0.8rem",
            color: "#718096",
            mt: 0.25,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}>
          {summary}
        </Typography>
      )}
    </Box>
  </Box>
)

export { TypeLabel, ResultItem }
export type { ResultItemProperties }
