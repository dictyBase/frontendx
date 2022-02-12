import { Box, Grid } from "@material-ui/core"
import { FooterContainerProps } from "footer/src/types"
import { footerStyles } from "footer/src/styles/footerStyles"
import { FooterHead } from "footer/src/components/FooterHead"
import { FooterSponsors } from "footer/src/components/FooterSponsors"
import { FooterLinks } from "footer/src/components/FooterLinks"

export const FooterContainer = ({ links }: FooterContainerProps) => {
  const classes = footerStyles()

  return (
    <footer className={classes.footer}>
      <Box px={2}>
        <Grid container justifyContent="center">
          <FooterHead />
          <FooterLinks links={links} />
          <FooterSponsors />
        </Grid>
      </Box>
    </footer>
  )
}
