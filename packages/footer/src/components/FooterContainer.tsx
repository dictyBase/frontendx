import { Box, Grid, Typography } from "@material-ui/core"
import { FooterContainerProps } from "footer/src/types"
import { footerStyles } from "footer/src/styles/footerStyles"

export const FooterContainer = ({ links }: FooterContainerProps) => {
  const classes = footerStyles()

  return (
    <footer className={classes.footer}>
      <Box px={2}>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Box my={2} textAlign="center">
              <Typography className={classes.header}>
                Dicty Community Resource
              </Typography>
            </Box>
          </Grid>
          <Grid item container justifyContent="center">
            {links.map((item, index) => {
              const separator = index ? " • " : ""
              return (
                <Typography
                  key={index}
                  variant="body2"
                  className={classes.link}>
                  <Box component="span" px={0.5}>
                    {separator}
                  </Box>
                  <a href={item.url}>{item.description}</a>
                </Typography>
              )
            })}
          </Grid>
          <Grid
            item
            xs={12}
            container
            justifyContent="flex-end"
            className={classes.support}>
            <Box mt={1} mb={2} mr={1} className={classes.link}>
              <em>
                Supported by{" "}
                <a
                  href="https://reporter.nih.gov/project-details/10024726"
                  target="_blank"
                  rel="noopener">
                  NIH
                </a>
                /
                <a
                  href="https://www.nigms.nih.gov/"
                  target="_blank"
                  rel="noopener">
                  NIGMS
                </a>
              </em>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </footer>
  )
}
