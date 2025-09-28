import { Link } from "react-router-dom"
import Button from "@mui/material/Button"

/**
 * BackToHomePageButton is a simple button that links back to the homepage.
 */

const BackToHomePageButton = () => (
  <Button
    component={Link}
    to="/"
    size="small"
    variant="contained"
    color="primary"
    sx={{
      width: "25%",
      padding: "20px",
      textTransform: "none",
      backgroundColor: "#15317e",
      color: "#e3e3e3",
      "&:hover": {
        backgroundColor: "#1a3d9e",
        color: "#fff",
      },
    }}>
    Back to Homepage
  </Button>
)

export { BackToHomePageButton }
