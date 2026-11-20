import Button from "@mui/material/Button"
import { Link } from "react-router-dom"

/**
 * AddPageButton is a simple button that links to the /addpage route.
 */

const AddPageButton = () => (
  <Button
    component={Link}
    to="../addpage"
    relative="path"
    sx={{
      width: "25%",
      marginTop: "25px",
      padding: "25px",
      textTransform: "none",
      backgroundColor: "secondary.main",
      "&:hover": {
        backgroundColor: "secondary.dark",
      },
    }}
    size="large"
    variant="contained"
    color="primary">
    Add Page
  </Button>
)

export { AddPageButton }
