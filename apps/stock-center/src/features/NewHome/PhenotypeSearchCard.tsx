import { Slideshow } from "@dictybase/ui-dsc"
import { Paper, Stack, Box, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const PhenotypeSearchCard = () => {
  const navigate = useNavigate()
  return (
    <Paper elevation={4} sx={{ p: 4 }}>
      <Typography variant="h2">Featured Repository Morphology</Typography>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Slideshow />
        </Box>
        <Stack flexGrow={1} spacing={2}>
          <Stack spacing={1}>
            <Typography variant="h3">Phenotype Search</Typography>
            <Typography variant="body1">
              Search <em>Dictyostelium</em> strains by phenotype annotation —
              find every strain linked to a cellular behavior, the genes
              involved, and the research behind each entry.
            </Typography>
          </Stack>
          <Button
            variant="outlined"
            onClick={() => navigate("/phenotypes")}
            sx={(theme) => ({
              alignSelf: "flex-start",
              borderColor: theme.palette.tertiary.main,
              color: theme.palette.tertiary.main,
              "&:hover": {
                borderColor: theme.palette.tertiary.dark,
                backgroundColor: theme.palette.tertiary.light,
              },
            })}>
            Explore Strains by Phenotype
          </Button>
        </Stack>
      </Stack>
    </Paper>
  )
}

export { PhenotypeSearchCard }
