import { Grid } from "@material-ui/core"
import { FooterLinksProperties } from "../types"

export const FooterLinks = ({ links }: FooterLinksProperties) => {
  return (
    <Grid item container justifyContent="center">
      {links}
    </Grid>
  )
}
