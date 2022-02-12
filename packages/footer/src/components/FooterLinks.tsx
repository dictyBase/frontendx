import { footerStyles } from "footer/src/styles/footerStyles"
import { Grid } from "@material-ui/core"
import { FooterLinksProps } from "footer/src/types"
import { FooterLink } from "./FooterLink"

export const FooterLinks = ({ links }: FooterLinksProps) => {
  const classes = footerStyles()

  return (
    <Grid item container justifyContent="center">
      {links.map((data, i) => (
        <FooterLink {...data} key={i} />
      ))}
    </Grid>
  )
}
