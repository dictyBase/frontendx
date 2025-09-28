import { Link } from "react-router-dom"
import { Typography, Grid } from "@mui/material"
import { styled } from "@mui/material/styles"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import { grey } from "@mui/material/colors"

const StyledGrid = styled(Grid)({
  width: "fit-content",
})

const StyledTypography = styled(Typography)({
  textDecoration: "underline",
  color: grey[700],
})

const StyledIcon = styled(HighlightOffIcon)({
  color: grey[700],
})

const SiteStatusUnavailable = () => {
  return (
    <StyledGrid container spacing={1} alignItems="flex-start">
      <Grid item>
        <StyledIcon />
      </Grid>
      <Grid item>
        <Link to="https://status.dictybase.dev/">
          <StyledTypography variant="h3">
            Site Status Unavailable
          </StyledTypography>
        </Link>
      </Grid>
    </StyledGrid>
  )
}

export { SiteStatusUnavailable }
