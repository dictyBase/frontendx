import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import FontAwesome from "react-fontawesome"
import Image from "next/image"

const useStyles = makeStyles({
  container: {
    backgroundColor: "#eff8fb",
    textAlign: "center",
    paddingTop: 30,
    paddingBottom: 30,
    marginBottom: 30,
    borderRadius: 5,
  },
  button: {
    width: "25%",
    textTransform: "none",
  },
  mainGrid: {
    marginTop: "40px",
  },
  paragraph: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  routerLink: {
    color: "#428bca",
    textDecoration: "none",
  },
})

/**
 * Fallback component for non-existent routes -- "Page Not Ready"/"Under Construction"
 */

const PageNotReady = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.mainGrid} justifyContent="center">
      <Grid item xs={10} md={8}>
        <div className={classes.container}>
          <Image
            src="/sad-dicty.png"
            alt="Sad Dicty Logo"
            width="350px"
            height="200%"
          />
          <h1>
            <FontAwesome name="wrench" /> Content Not Ready
          </h1>
          <p className={classes.paragraph}>This page is not ready yet.</p>
          <p className={classes.paragraph}>
            We are constantly adding content to our new website so check back
            soon!
          </p>
          <Button
            className={classes.button}
            href="/"
            size="small"
            variant="contained"
            color="primary">
            Back to homepage
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export { PageNotReady }
