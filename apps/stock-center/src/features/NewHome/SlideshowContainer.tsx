import { Slideshow } from "@dictybase/ui-dsc"
import { Paper, Stack, Box, Typography } from "@mui/material"

const SlideshowContainer = () => (
  <Paper elevation={4} sx={{ p: 4 }}>
    <Stack direction="row" spacing={3} justifyContent="" sx={{ mt: 2 }}>
      <Box sx={{ flexBasis: "33%", minWidth: 0 }}>
        <Slideshow />
      </Box>
      <Stack width={500} flexBasis="66%" spacing={2}>
        <Stack spacing={1}>
          <Typography variant="h3">Mutant Phenotypes</Typography>
          <Typography variant="body1">
            Micrographs of <em>Dictyostelium discoideum</em> mutant strains
            illustrating distinct developmental phenotypes
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  </Paper>
)

export { SlideshowContainer }
