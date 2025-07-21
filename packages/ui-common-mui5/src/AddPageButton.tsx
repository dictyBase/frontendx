import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(({ palette }) => ({
  addPageButton: {
    width: "25%",
    marginTop: "25px",
    padding: "25px",
    textTransform: "none",
    backgroundColor: palette.secondary.main,
    "&:hover": {
      backgroundColor: palette.secondary.dark,
    },
  },
}))

/**
 * AddPageButton is a simple button that links to the /addpage route.
 */

const AddPageButton = () => {
  const { addPageButton } = useStyles()

  return (
    <Button
      component={Link}
      to="../addpage"
      relative="path"
      className={addPageButton}
      size="large"
      variant="contained"
      color="primary">
      Add Page
    </Button>
  )
}

export { AddPageButton }
