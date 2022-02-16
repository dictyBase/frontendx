import { Grid } from "@material-ui/core"
import { FooterLinksProps } from "footer/src/types"

export const FooterLinks = ({ links }: FooterLinksProps) => {
  return (
    <Grid item container justifyContent="center">
      {links}
    </Grid>
  )
}
