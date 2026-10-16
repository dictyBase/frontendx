import { Slideshow } from "@dictybase/ui-dsc"
import { Paper, Stack, Box, Typography } from "@mui/material"

const PhenotypeSearchCard = () => (
  <Paper elevation={4} sx={{ p: 4 }}>
    <Typography variant="h3"> Phenotype Search </Typography>
    <Stack direction="row" spacing={4} sx={{ mt: 2 }}>
      <Box sx={{ height: "100%", flexShrink: "1" }}>
        <Slideshow />
      </Box>
      <Box flexGrow={1}>
        <Typography variant="body1">
          Developmental morphology specimens available across repository
          catalogs
        </Typography>
      </Box>
    </Stack>
  </Paper>
)

export { PhenotypeSearchCard }
