import { Paper, Box, Grid, Typography } from "@mui/material"
import { dscHomeTheme, Slideshow, HeroProperties } from "@dictybase/ui-dsc"
import { StockCenterInfoWithAuth } from "../StockCenterInfoWithAuth"

const Hero = ({ title, sx }: HeroProperties) => (
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
          </Typography>
          <Box sx={{ color: dscHomeTheme.colors.textSecondary }}>
            <StockCenterInfoWithAuth />
          </Box>
        </Grid>
        <Grid item md={4}>
          <Slideshow />
        </Grid>
      </Grid>
    </Box>
  </Paper>
)

export { Hero }
