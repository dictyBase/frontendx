import { Grid, Button, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow"
import { makeStyles } from "@material-ui/core/styles"

const useDictyNewsStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "inherit",
      color: "red",
    },
  },
}))

const MoreNewsLink = () => {
  const { link } = useDictyNewsStyles()
  return (
    <Grid justifyContent="flex-end" container>
      <Grid item>
        <Link to="/news">
          <Button className={link} endIcon={<DoubleArrowIcon />}>
            <Typography variant="h2"> More News </Typography>
          </Button>
        </Link>
      </Grid>
    </Grid>
  )
}

export { MoreNewsLink }
