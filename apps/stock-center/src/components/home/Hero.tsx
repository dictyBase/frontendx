import {
  Typography,
  IconButton,
  Paper,
  Box,
  Grid,
  Theme,
  SxProps,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import EditIcon from "@mui/icons-material/Edit"
import { useAuthorization } from "@dictybase/auth-mui5"
import { dscHomeTheme, Slideshow } from "@dictybase/ui-dsc"
import { StockCenterInfo } from "./StockCenterInfo"

type HeroProperties = {
  title: string
  sx?: SxProps<Theme>
}

const authorizedRoles = ["content-admin"]

const Hero = ({ title, sx }: HeroProperties) => {
  const navigate = useNavigate()
  const onClick = () => {
    navigate("/information/intro/edit")
  }
  const { isAuthorized } = useAuthorization({ entries: authorizedRoles })
  return (
    <Paper
      sx={{
        borderRadius: dscHomeTheme.borderRadius.lg,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}>
      <Box
        sx={{
          padding: 5,
          mb: 4,
          ...sx,
        }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item md={8}>
            <Typography
              variant="h1"
              fontSize="28pt"
              sx={{
                color: dscHomeTheme.colors.primary,
                fontWeight: 800,
                mb: 2,
              }}>
              {title}
              {isAuthorized ? (
                <IconButton
                  aria-label="Edit DSC Intro"
                  size="medium"
                  onClick={onClick}>
                  <EditIcon />
                </IconButton>
              ) : (
                <></>
              )}
            </Typography>
            <Box sx={{ color: dscHomeTheme.colors.textSecondary }}>
              <StockCenterInfo />
            </Box>
          </Grid>
          <Grid item md={4}>
            <Slideshow />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export { Hero }
