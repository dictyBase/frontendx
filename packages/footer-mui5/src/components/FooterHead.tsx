import { Box, Grid, Typography } from "@mui/material"
import { FooterHeadProperties } from "../types"

export const FooterHead = ({ title }: FooterHeadProperties) => (
  <Grid item xs={12}>
    <Box my={2} textAlign="center">
      <Typography>{title}</Typography>
    </Box>
  </Grid>
)
