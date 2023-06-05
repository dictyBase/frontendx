import { Box, Grid, Typography } from "@material-ui/core"
import { footerStyles } from "../styles/footerStyles"
import { FooterHeadProperties } from "../types"

export const FooterHead = ({ title }: FooterHeadProperties) => {
  const classes = footerStyles()

  return (
    <Grid item xs={12}>
      <Box my={2} textAlign="center">
        <Typography className={classes.header}>{title}</Typography>
      </Box>
    </Grid>
  )
}
