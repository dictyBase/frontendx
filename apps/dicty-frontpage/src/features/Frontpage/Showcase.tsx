import { Grid, makeStyles } from "@material-ui/core"
import { Slideshow } from "./SlideshowV2"
import { DictyInfo } from "./DictyInfo"

const useStyles = makeStyles({
  root: {
    height: "440px",
    overflow: "hidden",
  },
})

const Showcase = () => {
  const classes = useStyles()
  return (
    <Grid direction="column" wrap="nowrap" container className={classes.root}>
      <Grid item>
        <Slideshow />
      </Grid>
      <Grid item>
        <DictyInfo />
      </Grid>
    </Grid>
  )
}

export { Showcase }
