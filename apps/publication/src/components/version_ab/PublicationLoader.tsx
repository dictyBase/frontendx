import React from "react"
import { Skeleton } from "@mui/material"
import { Container, Box, Grid, makeStyles } from "@material-ui/core"
import { makeBy as AmakeBy } from "fp-ts/Array"
import { grey } from "@material-ui/core/colors"
import { PublicationSidebarLoader } from "./PublicationSidebarLoader"

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  background: {
    backgroundColor: grey[100],
  },
  foreground: {
    backgroundColor: "white",
    boxShadow: `2px 2px 7px ${grey[300]}, -2px 2px 7px ${grey[300]}`,
  },
  sidebar: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
}))

const PublicationLoader = () => {
  const classes = useStyles()

  return (
    <Box className={classes.background}>
      <Container disableGutters className={classes.foreground}>
        <Grid container direction="row">
          <Grid item xs={12} sm={12} md={1} className={classes.sidebar}>
            <PublicationSidebarLoader />
          </Grid>
          <Grid item xs={12} sm={12} md={10}>
            <Box className={classes.container}>
              <Skeleton height="100px" />
              {AmakeBy(3, (index) => (
                <Skeleton key={`a-${index}`} height="40px" />
              ))}
              <br />
              {AmakeBy(8, (index) => (
                <Skeleton key={`b-${index}`} height="40px" />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export { PublicationLoader }
