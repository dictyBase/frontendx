import { Link } from "react-router-dom"
import { grey } from "@mui/material/colors"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const continueButtonStyle = {
  fontWeight: 600,
  marginTop: 2,
  "&:hover": {
    color: grey[900],
  },
}

/**
 * ContinueShoppingCard is the card below the total/checkout card on the cart page.
 */
const ContinueShoppingCard = () => (
  <Card
    sx={{
      padding: 2,
      marginTop: 2,
      backgroundColor: grey[100],
    }}>
    <Typography variant="h3" align="center">
      Need something else?
    </Typography>
    <Button
      component={Link}
      to="/catalog"
      variant="contained"
      color="inherit"
      size="large"
      fullWidth
      startIcon={<FontAwesomeIcon icon="share" />}
      sx={continueButtonStyle}>
      Catalog
    </Button>
    <Button
      component={Link}
      to="/strains"
      variant="contained"
      color="inherit"
      size="large"
      fullWidth
      startIcon={<FontAwesomeIcon icon="share" />}
      sx={continueButtonStyle}>
      Browse Strains
    </Button>
    <Button
      component={Link}
      to="/plasmids"
      variant="contained"
      color="inherit"
      size="large"
      fullWidth
      startIcon={<FontAwesomeIcon icon="share" />}
      sx={continueButtonStyle}>
      Browse Plasmids
    </Button>
  </Card>
)

export { ContinueShoppingCard }
