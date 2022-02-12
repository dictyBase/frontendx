import { footerStyles } from "footer/src/styles/footerStyles"
import { Box, Grid, Typography } from "@material-ui/core"
import { FooterLinksProps } from "footer/src/types"

export const FooterLinks = ({ links }: FooterLinksProps) => {
  const classes = footerStyles()

  return (
    <Grid item container justifyContent="center">
      {links.map((item, index) => {
        const separator = index ? " • " : ""
        return (
          <Typography key={index} variant="body2" className={classes.link}>
            <Box component="span" px={0.5}>
              {separator}
            </Box>
            <a href={item.url}>{item.description}</a>
          </Typography>
        )
      })}
    </Grid>
  )
}
