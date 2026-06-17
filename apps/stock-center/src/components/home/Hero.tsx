import { Paper, Box, Grid, Typography } from "@mui/material"
import { dscHomeTheme } from "./dscTheme"
import { Slideshow } from "../home/Slideshow"
import type { HeroProperties } from "./types"

const Hero = ({ title, children, sx }: HeroProperties) => (
  <Paper>
    <Box
      sx={{
        // py: 6,
        px: 3,
        borderRadius: dscHomeTheme.borderRadius.lg,
        mb: 4,
        ...sx,
      }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={8}>
          <Typography
            variant="h1"
            sx={{
              color: dscHomeTheme.colors.primary,
              fontWeight: 900,
              mb: 2,
            }}>
            {title}
          </Typography>
          <Box sx={{ color: dscHomeTheme.colors.textSecondary }}>
            {children}
          </Box>
        </Grid>
        <Grid item xs={0} md={4}>
          <Slideshow />
        </Grid>
      </Grid>
    </Box>
  </Paper>
)

export { Hero }
