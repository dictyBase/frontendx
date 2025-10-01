import { Link } from "react-router-dom"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const BackToHomePage = () => {
  return (
    <Grid item>
      <Box margin={2}>
        <Button
          component={Link}
          to="/"
          color="primary"
          variant="contained"
          size="large"
          sx={{
            "&:hover": {
              color: (theme) => theme.palette.getContrastText(theme.palette.primary.main),
            },
          }}
          startIcon={<FontAwesomeIcon icon="home" />}>
          Back to DSC homepage
        </Button>
      </Box>
    </Grid>
  )
}

export { BackToHomePage }
