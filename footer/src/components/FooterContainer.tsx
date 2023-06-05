import { Box, Grid } from "@material-ui/core"
import { FooterContainerProps } from "@dictyBase/footer/src/types"
import { footerStyles } from "@dictyBase/footer/src/styles/footerStyles"
import { FooterHead } from "@dictyBase/footer/src/components/FooterHead"
import { FooterSponsors } from "@dictyBase/footer/src/components/FooterSponsors"
import { FooterLinks } from "@dictyBase/footer/src/components/FooterLinks"

export const FooterContainer = ({ links, title }: FooterContainerProps) => {
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
