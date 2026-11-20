import { Link } from "react-router-dom"
import Button from "@mui/material/Button"

/**
 * BackToHomePageButton is a simple button that links back to the homepage.
 */

const BackToHomepageButton = () => (
  <Button
    component={Link}
    to="/"
    sx={{
      width: "25%",
      padding: "20px",
      marginTop: "25px",
      textTransform: "none",
      backgroundColor: "#15317e",
      color: "#e3e3e3",
      "&:hover": {
        backgroundColor: "#1a3d9e",
        color: "#fff",
      },
    }}
    size="large"
    variant="contained"
    color="primary">
    Back to Homepage
  </Button>
)

export { BackToHomepageButton }
