import { Slideshow } from "@dictybase/ui-dsc"
import { Paper, Stack, Box, Typography, Button } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useNavigate } from "react-router-dom"

const PhenotypeSearchCard = () => {
  const navigate = useNavigate()
  return (
    <Paper elevation={4} sx={{ p: 4 }}>
      <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
        <Box sx={{ flexBasis: "33%", minWidth: 0 }}>
          <Slideshow />
        </Box>
        <Stack width={500} flexBasis="66%" spacing={2}>
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
            startIcon={<SearchIcon />}
            onClick={() => navigate("/phenotypes")}
            sx={(theme) => ({
              alignSelf: "flex-start",
              borderColor: theme.palette.primary.contrastText,
              color: theme.palette.primary.contrastText,
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
