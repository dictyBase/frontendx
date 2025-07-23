import { Box, Grid } from "@mui/material"
import { FooterContainerProperties } from "../types"
import { footerStyles } from "../styles/footerStyles"

export const FooterContainer = ({ children }: FooterContainerProperties) => {
  const { classes } = footerStyles()

  return (
    <Box component="footer" className={classes.footer}>
      <Box px={2}>
        <Grid container justifyContent="center">
          {children}
        </Grid>
      </Box>
    </Box>
  )
}
