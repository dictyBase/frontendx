import { Box, Grid } from "@mui/material"
import { FooterContainerProperties } from "../types"

export const FooterContainer = ({ children }: FooterContainerProperties) => (
  <Box
    component="footer"
    sx={(theme) => ({
      backgroundColor: theme.palette.primary.main,
      borderTop: `1px solid ${theme.palette.secondary.dark}`,
    })}>
    <Box px={2}>
      <Grid container justifyContent="center">
        {children}
      </Grid>
    </Box>
  </Box>
)
