import { Box, Grid } from "@material-ui/core"
import { FooterContainerProperties } from "../types"
import { footerStyles } from "../styles/footerStyles"

export const FooterContainer = ({ children }: FooterContainerProperties) => {
  const classes = footerStyles()

  return (
    <footer className={classes.footer}>
      <Box px={2}>
        <Grid container justifyContent="center">
          {children}
        </Grid>
      </Box>
    </footer>
  )
}
