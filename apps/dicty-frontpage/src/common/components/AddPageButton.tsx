import Button from "@material-ui/core/Button"
import { useNavigate } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { useSlug } from "../hooks/useSlug"

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
 * BackToHomePageButton is a simple button that links back to the homepage.
 */

const AddPageButton = () => {
  const slug = useSlug()
  const { addPageButton } = useStyles()
  const navigate = useNavigate()

  const onClick = () => {
    navigate("../addpage", { relative: "path", state: { slug } })
  }

  return (
    <Button
      onClick={onClick}
      className={addPageButton}
      size="large"
      variant="contained"
      color="primary">
      Add Page
    </Button>
  )
}

export { AddPageButton }
