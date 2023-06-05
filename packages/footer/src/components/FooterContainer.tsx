import { Box, Grid } from "@material-ui/core"
import { FooterContainerProperties } from "../types"
import { footerStyles } from "../styles/footerStyles"
import { FooterHead } from "./FooterHead"
import { FooterSponsors } from "./FooterSponsors"
import { FooterLinks } from "./FooterLinks"

export const FooterContainer = ({
  links,
  title,
}: FooterContainerProperties) => {
  const classes = footerStyles()

  return (
    <footer className={classes.footer}>
      <Box px={2}>
        <Grid container justifyContent="center">
          <FooterHead title={title} />
          <FooterLinks links={links} />
          <FooterSponsors />
        </Grid>
      </Box>
    </footer>
  )
}
