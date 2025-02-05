import { Grid } from "@mui/material"
import { FooterLinksProperties } from "../types"

export const FooterLinks = ({ links }: FooterLinksProperties) => (
  <Grid item container justifyContent="center">
    {links}
  </Grid>
)
