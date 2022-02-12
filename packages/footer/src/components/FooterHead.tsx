import { Box, Grid, Typography } from "@material-ui/core"
import { footerStyles } from "footer/src/styles/footerStyles"

export const FooterHead = () => {
  const classes = footerStyles()

  return (
    <Grid item xs={12}>
      <Box my={2} textAlign="center">
        <Typography className={classes.header}>
          Dicty Community Resource
        </Typography>
      </Box>
    </Grid>
  )
}
