import { Box, Grid } from "@material-ui/core"
import { footerStyles } from "../styles/footerStyles"

export const FooterSponsors = () => {
  const classes = footerStyles()

  return (
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
            rel="noopener noreferrer">
            NIH
          </a>
          /
          <a
            href="https://www.nigms.nih.gov/"
            target="_blank"
            rel="noopener noreferrer">
            NIGMS
          </a>
        </em>
      </Box>
    </Grid>
  )
}
