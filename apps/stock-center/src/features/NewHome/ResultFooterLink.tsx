import { Box } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { ACTIVE_BG } from "./types"

type ResultFooterLinkProperties = {
  to: string
  label: string
  isActive: boolean
}

const ResultFooterLink = ({
  to,
  label,
  isActive,
}: ResultFooterLinkProperties) => (
  <Box sx={{ borderTop: "1px solid #edf2f7" }}>
    <Box
      component={RouterLink}
      to={to}
      sx={{
        display: "block",
        px: 2,
        py: 1.25,
        fontSize: "0.8rem",
        fontWeight: 600,
        color: isActive ? "#1a56db" : "#3182ce",
        textDecoration: "none",
        backgroundColor: isActive ? ACTIVE_BG : "transparent",
        "&:hover": { backgroundColor: "#f7fafc", color: "#2b6cb0" },
      }}>
      {label}
    </Box>
  </Box>
)

export { ResultFooterLink }
export type { ResultFooterLinkProperties }
