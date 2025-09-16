import { makeStyles } from "@material-ui/core/styles"
import { Box, Grid, Button } from "@material-ui/core"
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
        <Box className={classes.container}>
          <Image
            src="https://storage.dictybase.dev/editor/assets/2024-11-04/0627257c-9ce3-4f02-b000-9e16ef5b1062"
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
        </Box>
      </Grid>
    </Grid>
  )
}

export { PageNotReady }
